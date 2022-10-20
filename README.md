# IIQ Emails Bookmarklet

Make it easy to copy the email for an IncidentIQ ticket to CC or forward email threads.

## Install

1. Create a new bookmark
2. Give it a reasonable name (e.g. `IIQ Emails`)
3. Paste the contents of [iiq-emails-bookmarklet.url](iiq-emails-bookmarklet.url) in as the URL

## Use

When viewing any list of tickets in IncidentIQ, click the bookmarklet to enable the copy email links.

| Before                          | After                     |
| ------------------------------- | ------------------------- |
| ![Without](/images/without.png) | ![With](/images/with.png) |

## Known Limitations

-   Repeated invocations will just keep adding more email links to the page
-   The email links block access to the actual ticket details
-   The page must be refreshed to get rid of the email links (and block on details)
-   No text-escaping is done, to prevent double-quotes in the ticket title from breaking the email address format `"Name" <email@example.com>`
