(() => {
  // TODO detect whether affected page is IIQ (only run on viable pages)
  // TODO clean up accumulated scripts at the bottom of the page
  const existing = $('.iiq-email');
  if (existing.length) {
    $(existing).remove();
  } else {
    $('.link-view-ticket[href*="/tickets/"]').each((i, a) => {
      const guid = /tickets\/(.*)/.exec(a.href)[1];
      const link = $(
        '<a class="iiq-email link" href="#">Copy Email Address</a>'
      ).appendTo($(a).parent().parent());
      const info = $(a).closest('.ticket-info-cell');
      const number = $(info).find('.ticket-number').text();
      const title = a.innerText // https://stackoverflow.com/a/14890774
        .replace(/'\b/g, '\u2018') // Opening singles
        .replace(/\b'/g, '\u2019') // Closing singles
        .replace(/"\b/g, '\u201c') // Opening doubles
        .replace(/\b"/g, '\u201d') // Closing doubles
        .replace(/--/g, '\u2014') // em-dashes
        .replace(/\b\u2018\b/g, "'"); // And things like "it's" back to normal.;
      $(link).click((e) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(
          '"' +
          title +
          ' (Ticket #' +
          number +
          ')" <' +
          guid +
          '@groton.incidentiq.com>'
        );
        $('body').append(
          '<p id="' +
          guid +
          '-copied" style="position: absolute; top: 1em; right: 1em; padding: 1em; background: lightgoldenrodyellow; color: darkgoldenrod; border-radius: 0.5em; border: solid 1px goldenrod; z-index:100000;">Email address for ' +
          title +
          ' (Ticket #' +
          number +
          ') copied to clipboard.</p>'
        );
        setTimeout(() => {
          $('#' + guid + '-copied').remove();
        }, 1000);
      });
    });
  }
})();
