(() => {
  const host = location.host;

  const ticketCache = {};

  async function ticket(ticketId) {
    if (!ticketCache[ticketId]) {
      ticketCache[ticketId] = iiq.WebApi.GetTicket(ticketId);
    }
    setTimeout(() => delete ticketCache[ticketId], 5000);
    return (await ticketCache[ticketId]).data.Item;
  }

  function email(ticket) {
    const subject = ticket.Subject.replace(/'\b/g, '\u2018') // https://stackoverflow.com/a/14890774 // Opening singles
      .replace(/\b'/g, '\u2019') // Closing singles
      .replace(/"\b/g, '\u201c') // Opening doubles
      .replace(/\b"/g, '\u201d') // Closing doubles
      .replace(/--/g, '\u2014') // em-dashes
      .replace(/\b\u2018\b/g, "'"); // And things like "it's" back to normal.;

    const name = `${subject} (Ticket #${ticket.TicketNumber})`;

    return { formattedEmail: `"${name}" <${ticket.TicketId}@${host}>`, name };
  }

  function link(ticket) {
    return {
      text: ticket.For.Email,
      href: `mailto:${ticket.For.Email}?cc=${encodeURIComponent(
        email(ticket).formattedEmail
      )}`
    };
  }

  function sendElt(ticket) {
    const elt = document.createElement('div');
    elt.classList.add('email-incidents');
    elt.innerHTML = `<a class="send" href="#" target="_blank"><i class="fa fa-paper-plane"></i>&nbsp;<span class="text">Send Email</span></a>`;
    const send = elt.querySelector('.send');

    const { text, href } = link(ticket);
    send.href = href;
    send.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    send.querySelector('.text').innerText = text;

    return elt;
  }

  function copyElt(ticket) {
    const elt = document.createElement('div');
    elt.classList.add('email-incidents');
    elt.innerHTML = `<a href="#" class="copy"><i class="fa-regular fa-copy"></i>&nbsp;Copy Ticket Email</a>`;

    const copy = elt.querySelector('.copy');
    const { formattedEmail, name } = email(ticket);
    copy.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      navigator.clipboard.writeText(formattedEmail);
      chrome.runtime.sendMessage('pdnapjogoplmplacjefclkajodidjiam', {
        copiedEmail: name
      });
    });
    return elt;
  }

  async function appendSendToPreview(viewTicketLink) {
    viewTicketLink.classList.add('iiq-email', 'email-link-added');
    const ticketId = /tickets\/(.*)/.exec(viewTicketLink.href)[1];
    viewTicketLink
      .closest('spark-grid-row')
      .querySelector('spark-grid-tickets-col-requested-for')
      .appendChild(sendElt(await ticket(ticketId)));
  }

  async function appendCopyToPreview(viewTicketLink) {
    const ticketId = /tickets\/(.*)/.exec(viewTicketLink.href)[1];
    viewTicketLink
      .closest('.ticket-info-cell')
      .appendChild(copyElt(await ticket(ticketId)));
  }

  function ticketIdFromLocation() {
    // most common fly-out option
    let ticketId = new URLSearchParams(location.search).get('flyout-id');
    if (!ticketId) {
      // less common ticket page
      ticketId = location.pathname.match(/tickets\/(.*)/)[1];
    }
    if (!ticketId) {
      // even less common ticket creation
      ticketId = location.pathname.match(/tickets\/confirmation\/(.+)\??/)[1];
    }
    return ticketId;
  }

  async function updateEmailMeta(emailMetaDiv) {
    emailMetaDiv.replaceWith(sendElt(await ticket(ticketIdFromLocation())));
  }

  async function appendCopyToTicketDetails(detail) {
    Array.from(
      detail
        .closest('spark-agent-ticket-details')
        .querySelectorAll('spark-ticket-details-bar .ticket-detail')
    )
      .pop()
      .insertAdjacentElement(
        'afterend',
        copyElt(await ticket(ticketIdFromLocation()))
      )
      .classList.add('ticket-detail');
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // update ticket previews
        if (node.querySelectorAll) {
          Array.from(
            node.querySelectorAll(
              '.ticket-info-cell .link-view-ticket[href*="/tickets/"]:not(.iiq-email.email-link-added)'
            )
          ).forEach((preview) => {
            appendSendToPreview(preview);
            appendCopyToPreview(preview);
          });

          // update ticket owners
          Array.from(
            node.querySelectorAll(
              'spark-ticket-requestor:not(:has(div[ng-show="$ctrl.Ticket.For.Email"])) [ng-show="$ctrl.Ticket.Owner.Email"], [ng-show="$ctrl.Ticket.For.Email"]'
            )
          ).forEach((detail) => {
            updateEmailMeta(detail);
            appendCopyToTicketDetails(detail);
          });
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
