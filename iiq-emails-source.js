// TODO detect whether affected page is IIQ (only run on viable pages)
// TODO escape title text for safer email addresses
// TODO clean up accumulated scripts at the bottom of the page
let existing = $('.iiq-email');
if (existing.length) {
  $(existing).remove();
} else {
  $('.link-view-ticket[href*="/tickets/"]').each((i, a) => {
    const guid = /tickets\/(.*)/.exec(a.href)[1];
    const link = $('<a class="iiq-email link" href="#">Copy Email Address</a>').appendTo($(a).parent().parent());
    const info = $(a).closest('.ticket-info-cell');
    const number = $(info).find('.ticket-number').text();
    const title = a.innerText;
    $(link).click(e => {
      e.stopPropagation();
      e.preventDefault();
      navigator.clipboard.writeText('"' + title + ' (Ticket #' + number + ')" <' + guid + '@groton.incidentiq.com>');
      const message = $('body').append('<p id="' + guid + '-copied" style="position: absolute; top: 1em; right: 1em; padding: 1em; background: lightgoldenrodyellow; color: darkgoldenrod; border-radius: 0.5em; border: solid 1px goldenrod; z-index:100000;">Email address for ' + title + ' (Ticket #' + number + ') copied to clipboard.</p>');
      setTimeout(() => {
        $('#' + guid + '-copied').remove();
      }, 1000);
    });
  })
}
