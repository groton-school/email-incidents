(() => {
  const host = location.host;
  const iconStyle = 'fa fa-paper-plane';

  async function emailHref(ticketId) {
    const {
      data: { Item: ticket }
    } = await iiq.WebApi.GetTicket(ticketId);

    return {
      email: ticket.For.Email,
      href: `mailto:${ticket.For.Email}?cc=${encodeURIComponent(
        `"${ticket.Subject} (Ticket #${ticket.TicketNumber})" <${ticket.TicketId}@${host}>`
      )}`
    };
  }

  function emailElt(ticketId) {
    const div = document.createElement('div');
    div.innerHTML = `<div class="iiq-email link"><a href="#" target="_blank"><i class="${iconStyle}"></i> <span class="text">Send Email</span></a></div>`;
    const link = div.firstChild;
    emailHref(ticketId).then(({ email, href }) => {
      link.firstChild.href = href;
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      link.querySelector('.text').innerText = email;
    });
    return link;
  }

  function appendEmailToPreview(viewTicketLink) {
    viewTicketLink.classList.add('iiq-email', 'email-link-added');
    const guid = /tickets\/(.*)/.exec(viewTicketLink.href)[1];
    viewTicketLink
      .closest('spark-grid-row')
      .querySelector('spark-grid-tickets-col-requested-for')
      .appendChild(emailElt(guid));
  }

  function updateEmailMeta(emailMetaDiv) {
    // most common fly-out option
    let ticketId = new URLSearchParams(location.search).get('flyout-id');
    if (!ticketId) {
      // less common ticket page
      ticketId = location.pathname.match(/tickets\/(.*)/)[1];
    }
    emailMetaDiv.replaceWith(emailElt(ticketId));
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
          ).forEach(appendEmailToPreview);

          // update ticket owners
          Array.from(
            node.querySelectorAll(
              'spark-ticket-requestor:not(:has(div[ng-show="$ctrl.Ticket.For.Email"])) [ng-show="$ctrl.Ticket.Owner.Email"], [ng-show="$ctrl.Ticket.For.Email"]'
            )
          ).forEach(updateEmailMeta);
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
