(()=>{"use strict";var e={954:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=o(r(336));(()=>{const e=(0,i.default)(".iiq-email");e.length?(0,i.default)(e).remove():(0,i.default)('.link-view-ticket[href*="/tickets/"]').each(((e,t)=>{const r=/tickets\/(.*)/.exec(t.href)[1],o=(0,i.default)('<a class="iiq-email link" href="#">Copy Email Address</a>').appendTo((0,i.default)(t).parent().parent()),a=(0,i.default)(t).closest(".ticket-info-cell"),l=(0,i.default)(a).find(".ticket-number").text(),d=t.innerText.replace(/'\b/g,"‘").replace(/\b'/g,"’").replace(/"\b/g,"“").replace(/\b"/g,"”").replace(/--/g,"—").replace(/\b\u2018\b/g,"'");(0,i.default)(o).click((e=>{e.stopPropagation(),e.preventDefault(),navigator.clipboard.writeText('"'+d+" (Ticket #"+l+')" <'+r+"@groton.incidentiq.com>"),(0,i.default)("body").append('<p id="'+r+'-copied" style="position: absolute; top: 1em; right: 1em; padding: 1em; background: lightgoldenrodyellow; color: darkgoldenrod; border-radius: 0.5em; border: solid 1px goldenrod; z-index:100000;">Email address for '+d+" (Ticket #"+l+") copied to clipboard.</p>"),setTimeout((()=>{(0,i.default)("#"+r+"-copied").remove()}),1e3)}))}))})()},336:e=>{e.exports=$}},t={};!function r(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,r),a.exports}(954)})();