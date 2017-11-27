const Asc = -1;
const MXQueryParams = [];
let MXCustomVariable = '';

function pidTracker(OrgId, Domain) {
  document.cookie = 'MXCookie';

  // 01 Initialize Variables
  const Referrer = encodeURIComponent(document.referrer);
  const PageTitle = encodeURIComponent(document.title);
  const OrgCode = encodeURIComponent(OrgId);
  const CookieEnabled = encodeURIComponent(document.cookie.indexOf('MXCookie') >= 0 ? 1 : 0);
  const URLProtocol = window.location.protocol;
  const PID = GetCookie(`ORG${OrgId}`);
  const RefDomain = (typeof (Domain) !== 'undefined') ? Domain : 'web.mxradon.com';
  const CustomVariables = encodeURIComponent(MXCustomVariable);
  const LPIds = document.getElementsByName('MXHLandingPageId');
  const LandingPageId = GetLandingPageId();

  // 02 Create JScriptURL
  const JScriptURL = `${URLProtocol}//${RefDomain}/t/WebTracker.aspx?p1=${OrgCode}&p2=${PageTitle}&p3=${Asc}&p4=${Referrer}&p5=${CookieEnabled}&p6=${PID}&p7=${CustomVariables}&p8=${LandingPageId}`;

  // 03 Attach script tag to document header
  const ElementHead = document.getElementsByTagName('head')[0];

  const JSScript = document.createElement('script');
  JSScript.type = 'text/javascript';
  JSScript.async = true;
  JSScript.src = JScriptURL;

  ElementHead.appendChild(JSScript);
}

function GetCookie(c_name) {
  let i,
    x,
    y,
    ARRcookies = document.cookie.split(';');
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, '');
    if (x == c_name) {
      return unescape(y);
    }
  }
}

function MXPush(key, value) {
  MXCustomVariable += (`${key}{=}${value}{next}`);
}

function GetLandingPageId() {
  // 01 If Landing Page Id is set in variable "MXLandingPageId", then return that Landing Page Id
  if (typeof (MXLandingPageId) !== 'undefined' && MXLandingPageId != null && MXLandingPageId != '') {
    return MXLandingPageId;
  }

  // 02 If Landing Page Id is passed in query string "lpid", then return that Landing Page Id
  loadQueryStringParams();
  const queryLandingPageId = MXQueryParams.lpid;
  if (typeof (queryLandingPageId) !== 'undefined' && queryLandingPageId != null && queryLandingPageId != '') {
    return queryLandingPageId;
  }

  return '';
}

function loadQueryStringParams() {
  const query = window.location.search.substring(1);
  const parms = query.split('&');
  for (let i = 0; i < parms.length; i++) {
    const pos = parms[i].indexOf('=');
    if (pos > 0) {
      const key = parms[i].substring(0, pos);
      const val = parms[i].substring(pos + 1);
      MXQueryParams[key] = val;
    }
  }
}


/** ************************* */
/* WEB EVENT TRACKER SCRIPT */
/** ************************* */
function logMXWebEvent(orgId, eventCode, note, score) {
  // p1 => OrgCode
  // p2 => PID
  // p3 => WebEventCode
  // p4 => AssociatedScore
  // p5 => PageTitle
  // p6 => PageReferrer
  // p7 => PageURL
  // p8 => Note
  // p9 => CookieEnabled

  // 00 Create MXCookie
  document.cookie = 'MXCookie';

  // 01 Initialize Variables
  let OrgCode = (encodeURIComponent(orgId || '')),
    PID = (GetCookie(`ORG${OrgCode}`) || ''),
    WebEventCode = (encodeURIComponent(eventCode) || ''),
    AssociatedScore = (score && !isNaN(score)) ? score : '',
    PageTitle = (encodeURIComponent(document.title)),
    PageReferrer = (encodeURIComponent(document.referrer)),
    PageURL = (encodeURIComponent(document.location.href)),
    Note = (encodeURIComponent(note || '')),
    CookieEnabled = (encodeURIComponent(document.cookie.indexOf('MXCookie') >= 0 ? 1 : 0)),
    LandingPageId = GetLandingPageId();

    // 02 Create JScriptURL
  let ScriptName = 'event-tracking-script',
    URLProtocol = window.location.protocol,
    RefDomain = ('web.mxradon.com'),
    JScriptURL = `${URLProtocol}//${RefDomain}/t/WebEventTracker.aspx?p1=${OrgCode}&p2=${PID}&p3=${WebEventCode}&p4=${AssociatedScore}&p5=${PageTitle}&p6=${PageReferrer}&p7=${PageURL}&p8=${Note}&p9=${CookieEnabled}&p10=${LandingPageId}`;

    // 03 Remove Event Tracking Script (if exists)
  _removeEventTrackingScript();

  // 04 Attach Event Tracking Script to Head Tag
  const JSScript = document.createElement('script');
  JSScript.type = 'text/javascript';
  JSScript.async = true;
  JSScript.src = JScriptURL;
  JSScript.setAttribute('name', ScriptName);

  document.getElementsByTagName('head')[0].appendChild(JSScript);

  /* Helper Functions */
  function _removeEventTrackingScript() {
    const Head = document.getElementsByTagName('head')[0];
    const eventTrackingScript = Head.querySelector(`script[name="${ScriptName}"]`);
    if (eventTrackingScript) {
      Head.removeChild(eventTrackingScript);
    }
  }
}


/** ***************************** */
/* LeadSquaredTopbar Script     */
/** ***************************** */
function loadTopbar(OrgId) {
  getTopbar(OrgId);
}
function getTopbar(OrgId) {
  // p1  => OrgCode
  // p2  => PageURL
  // p3  => PageReferrer
  // p4  => PageTitle
  // p5  => IsDebuggingAllowed
  // p6  => Current Time Stamp in UTC

  // 01 Initialize Variables
  const Referrer = encodeURIComponent(document.referrer);
  const PageTitle = encodeURIComponent(document.title);
  const PageUrl = encodeURIComponent(location.href);
  const OrgCode = encodeURIComponent(OrgId);
  const URLProtocol = window.location.protocol;
  const RefDomain = 'web.mxradon.com';
  const currentTimeStamp = Math.round(new Date().getTime() / 1000.0);
  const WidgetType = 1; // 1. Topbar

  // 02 Create JScriptURL
  const JScriptURL = `${URLProtocol}//${RefDomain}/t/LeadSquaredWidget.aspx?p1=${OrgCode}&p2=${PageUrl}&p3=${Referrer}&p4=${PageTitle}&p5=false` + `&p6=${currentTimeStamp}&p7=${WidgetType}`;

  // 03 Attach script tag to document header
  const ElementHead = document.getElementsByTagName('head')[0];

  const JSScript = document.createElement('script');
  JSScript.type = 'text/javascript';
  JSScript.src = JScriptURL;

  ElementHead.appendChild(JSScript);
}
const MergeJSON = function (mergeWith, newObj) {
  for (const key in newObj) {
    mergeWith[key] = newObj[key];
  }
  return mergeWith;
}

function logWebEvent(orgId) {
  const mxMessage = `Message{=}Topbar CTA button clicked by the user{mxend}WebWidgetId{=}${mxTopbarId}{mxend}WebWidgetName{=}${mxTopbarName}{mxend}`;
  logMXWebEvent(orgId, '152', mxMessage);
  return true;
}

function closeLSQTopbar(orgId) {
  const topbarIframe = document.getElementById('lsqtopbar_container');
  const topbarContentWindow = topbarIframe.contentDocument || topbarIframe.contentWindow.document;
  const topbarMessage = topbarContentWindow.getElementById('topbar_message');
  const topbarLink = topbarContentWindow.getElementById('topbar_linktext')
  const topbarPusher = document.getElementById('lsqtopbar_pusher');
  const topbarLinkVal = topbarLink.href.slice(-1) === '/' ? topbarLink.href.substring(0, topbarLink.href.length - 1).trim() : topbarLink.href;
  const topbarData = {
    Message: topbarMessage.textContent.trim(),
    LinkUrl: topbarLinkVal.trim(),
    OrgCode: orgId,
    TopbarId: mxTopbarId.trim(),
    TopbarName: mxTopbarName.trim()
  };
  const now = new Date();
  const time = now.getTime();
  const expireTime = time + 1000 * 3.15569e7 * 10; // 10 Years
  now.setTime(expireTime);
  document.cookie = `LSQTopBarCookie=${JSON.stringify(topbarData)};expires=${now.toGMTString()};path=/`;

  topbarIframe.style.display = 'none';
  topbarPusher.style.display = 'none';
  const openTopbar = window.parent.document.getElementById('lsqtopbar-open');
  openTopbar.style.display = '';
  return false;
}

pidTracker('14457');
