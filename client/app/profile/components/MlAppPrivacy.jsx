import React, {Component} from "react";
import {render} from "react-dom";
import _ from "lodash";
import ScrollArea from "react-scrollbar";

export default class MlAppPrivacy extends Component {
  constructor(props) {
    super(props);
    return this;
  }
  componentDidUpdate() {
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.app_header').outerHeight(true)));
  }

  render() {
    let that = this

    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap no_padding">
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-md-12">
                <div className="blank_content">
            <h5>Welcome to our Privacy Policy.</h5>
            <p>Your privacy is critically important to us.</p>
            <p>moolya’s office is located at:<div className="clearfix"></div> #1002, 10th Floor, The Platina, Gachibowli Road, Gachibowli, Hyderabad, Telangana, IN - 500032 <div className="clearfix"></div> Mobile: 91-99664 08213</p>
            <p>It is moolya’s policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to moolya.global (hereinafter, "us", "we", or "moolya.global"). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy ("Privacy Policy") to explain what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other sources.This Privacy Policy, together with the Terms and conditions posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms and conditions.</p>
            <h5>- Website Visitors:</h5>
            <p>Like most website operators, moolya collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. moolya’s purpose in collecting non-personally identifying information is to better understand how moolya’s visitors use its website. From time to time, moolya may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.</p>
            <p>moolya also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on http://moolya.global blog posts. moolya only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below:</p>
            <h5>- Gathering of Personally-Identifying Information:</h5>
            <p>Certain visitors to moolya’s websites choose to interact with moolya in ways that require moolya to gather personally-identifying information. The amount and type of information that moolya gathers depends on the nature of the interaction. For example, we ask visitors who sign up for a blog at http://moolya.global to provide a username and email address.</p>
            <h5>- Security</h5>
            <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
            <h5>- Advertisements</h5>
            <p>Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by moolya and does not cover the use of cookies by any advertisers.</p>
            <h5>- Links To External Sites</h5>
            <p>Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.</p>
            <h5>- moolya.global uses Google AdWords for remarketing</h5>
            <p>moolya.global uses the remarketing services to advertise on third party websites (including Google) to previous visitors to our site. It could mean that we advertise to previous visitors who haven’t completed a task on our site, for example using the contact form to make an enquiry. This could be in the form of an advertisement on the Google search results page, or a site in the Google Display Network. Third-party vendors, including Google, use cookies to serve ads based on someone’s past visits. Of course, any data collected will be used in accordance with our own privacy policy and Google’s privacy policy.</p>
            <p>You can set preferences for how Google advertises to you using the Google Ad Preferences page, and if you want to you can opt out of interest-based advertising entirely by cookie settings or permanently using a browser plugin.</p>
            <h5>- Protection of Certain Personally-Identifying Information</h5>
            <p>moolya discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on moolya’s behalf or to provide services available at moolya’s website, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using moolya’s website, you consent to the transfer of such information to them. moolya will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, moolya discloses potentially personally-identifying and personally-identifying information only in response to a subpoena, court order or other governmental request, or when moolya believes in good faith that disclosure is reasonably necessary to protect the property or rights of moolya, third parties or the public at large.</p>
            <p>If you are a registered user of http://moolya.global and have supplied your email address, moolya may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what’s going on with moolya and our products. We primarily use our blog to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. moolya takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.</p>
            <h5>- Aggregated Statistics</h5>
            <p>moolya may collect statistics about the behavior of visitors to its website. moolya may display this information publicly or provide it to others. However, moolya does not disclose your personally-identifying information.</p>
            <h5>- Affiliate Disclosure</h5>
            <p>This site uses affiliate links and does earn a commission from certain links. This does not affect your purchases or the price you may pay.</p>
            <h5>- Cookies</h5>
            <p>To enrich and perfect your online experience, moolya uses "Cookies", similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.</p>
            <p>A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns. moolya uses cookies to help moolya identify and track visitors, their usage of http://moolya.global, and their website access preferences. moolya visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using moolya’s websites, with the drawback that certain features of moolya’s websites may not function properly without the aid of cookies.</p>
            <p>By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to moolya's use of cookies.</p>
            <h5>- E-commerce</h5>
            <p>Those who engage in transactions with moolya – by purchasing moolya's services or products, are asked to provide additional information, including as necessary the personal and financial information required to process those transactions. In each case, moolya collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor’s interaction with moolya. moolya does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website-related activities.</p>
            <h5>- Business Transfers</h5>
            <p>If moolya, or substantially all of its assets, were acquired, or in the unlikely event that moolya goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of moolya may continue to use your personal information as set forth in this policy.</p>
            <h5>- Privacy Policy Changes:</h5>
            <p>Although most changes are likely to be minor, moolya may change its Privacy Policy from time to time, and in moolya’s sole discretion. moolya encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.</p>
            <h5>- Credit & Contact Information:</h5>
            <p>This privacy policy was created at privacygen.com. If you have any questions about this Privacy Policy, please contact us via email or phone (details in CONTACT US of www.moolya.global)</p>
          </div>
          </div>
        </ScrollArea></div>
        </div>
      </div>
    )
  }
};
