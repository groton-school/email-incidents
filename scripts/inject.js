(() => {
  const host = location.host;

  async function addEmailLink(cell) {
    const a = cell.querySelector('.link-view-ticket[href*="/tickets/"]');
    const guid = /tickets\/(.*)/.exec(a.href)[1];
    const div = document.createElement('div');
    div.innerHTML = `<a href="#" class="iiq-email link" target="_blank">Send Email</a>`;
    const link = div.firstChild;
    cell.appendChild(link);

    iiq.WebApi.GetTicket(guid).then(({ data: { Item: ticket } }) => {
      link.href = `mailto:${ticket.For.Email}?cc=${encodeURIComponent(
        `"${ticket.Subject} (Ticket # ${ticket.TicketNumber})" <${ticket.TicketId}@${host}>`
      )}&body=${encodeURIComponent(`${ticket.For.FirstName} --`)}`;
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.querySelectorAll) {
          Array.from(
            node.querySelectorAll(
              '.ticket-info-cell:not(:has(a.iiq-email.link)):has(.link-view-ticket[href*="/tickets/"])'
            )
          ).forEach(addEmailLink);
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
