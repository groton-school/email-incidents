<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css" integrity="sha512-ZKX+BvQihRJPA8CROKBhDNvoc2aDMOdAlcm7TUQY+35XYtrd3yh95QOOhsPDQY9QnKE0Wqag9y38OIgEvb88cA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

# IIQ Emails Bookmarklet

Make it easy to copy the email for an IncidentIQ ticket to CC or forward email threads.

## Install

Drag the link below up to your bookmarks bar:

<a style="background: royalblue; color: white; padding: 1em; font-weight: bold;" href="javascript:(function(){var jsCode = document.createElement('script');jsCode.setAttribute('src', 'https://groton-school.github.io/iiq-emails-bookmarklet/iiq-emails-source.js');document.body.appendChild(jsCode);}());">IIQ Emails</a>

(If the link above isn't a link with a blue background, [click here](https://groton-school.github.io/iiq-emails-bookmarklet/))

## Use

When viewing any list of tickets in IncidentIQ, click the bookmarklet to enable the copy email links.

| Before                          | After                     |
| ------------------------------- | ------------------------- |
| <a href="/images/without.png" data-lightbox="screenshots"/><img src="/images/without.png" /></a> | <a href="/images/with.png" data-lightbox="screenshots"><img src="/images/with.png" /></a> |

## Known Limitations

-   Zero attention is paid to whether or not the page affected is IIQ or not
-   Repeated invocations will just keep adding more email links to the page
-   The email links block access to the actual ticket details
-   The page must be refreshed to get rid of the email links (and block on details)
-   No text-escaping is done, to prevent double-quotes in the ticket title from breaking the email address format `"Name" <email@example.com>`

<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox-plus-jquery.min.js" integrity="sha512-6gudNVbNM/cVsLUMOb8g2b/RBqtQJ3aDfRFgU+5paeaCTtbYY/Dg00MzZq7r6RvJGI2KKtPBhjkHGTL/iOe21A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
