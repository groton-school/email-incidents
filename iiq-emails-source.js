function IIQEmails() {
  $('.link-view-ticket[href*="/tickets/"]').each((i, a) => {
    const guid = /tickets\/(.*)/.exec(a.href)[1];
    const link = $('<a href="#">Copy Email Address</a>').appendTo($(a).parent().parent());
    console.log(link);
    const info = $(a).closest('.ticket-info-cell');
    const number = $(info).find('.ticket-number').text();
    $(link).click(e => {
      e.stopPropagation();
      e.preventDefault();
      navigator.clipboard.writeText('"' + a.innerText + ' (Ticket #' + number + ')" <' + guid + '@groton.incidentiq.com>');
      const message = $('body').append('<p id="' + guid + '-copied" style="position: absolute; top: 1em; right: 1em; padding: 1em; background: lightgoldenrodyellow; color: darkgoldenrod; border-radius: 0.5em; border: solid 1px goldenrod; z-index:100000;">Email address for ' + a.innerText + ' (Ticket #' + number + ') copied to clipboard.</p>');
      setTimeout(() => {
        $('#' + guid + '-copied').remove();
      }, 1000);
    });
  })
}
