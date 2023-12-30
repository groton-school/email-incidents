(() => {
  const host = location.host;

  function Await(result, callback) {
    if (result.$$state.status !== 1) {
      setTimeout(() => Await(result, callback));
    } else {
      callback(result.$$state.value.data.Item);
    }
  }

  async function addEmailLink(cell) {
    const a = cell.querySelector('.link-view-ticket[href*="/tickets/"]');
    const guid = /tickets\/(.*)/.exec(a.href)[1];
    const link = document.createElement('a');
    link.classList.add('iiq-email', 'link');
    link.innerText = 'Send Email';
    link.href = '#';
    cell.appendChild(link);

    const title = a.innerText // https://stackoverflow.com/a/14890774
      .replace(/'\b/g, '\u2018') // Opening singles
      .replace(/\b'/g, '\u2019') // Closing singles
      .replace(/"\b/g, '\u201c') // Opening doubles
      .replace(/\b"/g, '\u201d') // Closing doubles
      .replace(/--/g, '\u2014') // em-dashes
      .replace(/\b\u2018\b/g, "'"); // And things like "it's" back to normal.;

    Await(iiq.WebApi.GetTicket(guid), (ticket) => {
      link.href = `mailto:${
        ticket.For.Email
      }?cc=${`"${title} (Ticket #${ticket.TicketNumber})" <${guid}@${host}>`}&body=${`${ticket.For.FirstName} --`}`;
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log(e.target.href);
      });
    });
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.querySelectorAll) {
          Array.from(
            node.querySelectorAll(
              '.ticket-info-cell:not(:has(a.iiq-email)):has(.link-view-ticket[href*="/tickets/"])'
            )
          ).forEach(addEmailLink);
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
