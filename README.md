# IIQ Emails Bookmarklet

Make it easy to copy the email for an IncidentIQ ticket to CC or forward email threads.

## Install

Drag this link to your bookmarks bar: [IIQ Emails](javascript:(function()%7B%24('.link-view-ticket%5Bhref*%3D%22%2Ftickets%2F%22%5D').each((i%2C%20a)%20%3D%3E%20%7B%0A%09const%20guid%20%3D%20%2Ftickets%5C%2F(.*)%2F.exec(a.href)%5B1%5D%3B%0A%09const%20link%20%3D%20%24(a).parent().parent().append('%3Ca%20href%3D%22%23%22%3ECopy%20Email%20Address%3C%2Fa%3E')%3B%0A%09const%20info%20%3D%20%24(a).closest('.ticket-info-cell')%3B%0A%09const%20number%20%3D%20%24(info).find('.ticket-number').text()%3B%0A%09%24(link).click(e%20%3D%3E%20%7B%0A%09%09e.stopPropagation()%3B%0A%09%09e.preventDefault()%3B%0A%09%09navigator.clipboard.writeText('%22'%20%2B%20a.innerText%20%2B%20'%20(Ticket%20%23'%20%2B%20number%20%2B%20')%22%20%3C'%20%2B%20guid%20%2B%20'%40groton.incidentiq.com%3E')%3B%0A%09%09const%20message%20%3D%20%24('body').append('%3Cp%20id%3D%22'%20%2B%20guid%20%2B%20'-copied%22%20style%3D%22position%3A%20absolute%3B%20top%3A%201em%3B%20right%3A%201em%3B%20padding%3A%201em%3B%20background%3A%20lightgoldenrodyellow%3B%20color%3A%20darkgoldenrod%3B%20border-radius%3A%200.5em%3B%20border%3A%20solid%201px%20goldenrod%3B%20z-index%3A100000%3B%22%3EEmail%20address%20for%20'%20%2B%20a.innerText%20%2B%20'%20(Ticket%20%23'%20%2B%20number%20%2B%20')%20copied%20to%20clipboard.%3C%2Fp%3E')%3B%0A%09%09setTimeout(()%20%3D%3E%20%7B%0A%09%09%09%24('%23'%20%2B%20guid%20%2B%20'-copied').remove()%3B%0A%09%09%7D%2C%201000)%3B%0A%09%7D)%3B%0A%7D)%7D)()%3B)
  
## Use
 
When viewing any list of tickets in IncidentIQ, click the bookmarklet to enable the copy email links.
 
| Before	| After	|
| --------- | ----- |
| ![Without](/images/without.png) | ![With](/images/with.png) |