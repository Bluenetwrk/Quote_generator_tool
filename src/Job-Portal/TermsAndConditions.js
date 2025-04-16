import React  from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import Up from "./img/icons8-arrow-button-24.png"
import Down from "./img/icons8-down-button-24.png"
import Footer from './Footer/Footer'
import useScreenSize from './SizeHook';



function TermsAndCondition() {
  const screenSize = useScreenSize();

    const [TermsAndCondition, setTermsAndCondition]= useState([])

   async function getAboutUs(){
    await axios.get("/admin/getWebsiteDetails")
    .then((res)=>{
        let result = res.data.result
        // console.log(result[0].AboutUs)
        setTermsAndCondition(result[0].TermsAndCondition)
    })
    }

    useEffect(()=>{
getAboutUs()
    },[])

    function goUp(){
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
    }
    function goDown(){
      window.scrollTo(50,5000000)

      }      

  return (
    <div>
          <img style={{marginLeft:"50%",}}  onClick={()=>{goDown()}} src = {Down}/>
     
        <div style={{marginLeft:"10px"}}>
        <h2 style={{marginLeft:"1px", fontWeight:"800", marginTop:"5px"}}> Terms & Condition</h2>

        <p>
          WE DO NOT GUARANTEE OR OFFER ANY WARRANTY OF ANY INTERVIEW CALLS OR ASSURE ANY JOB OFFERS WITH ANY OF OUR SERVICES OR FROM ANY PROSPECTIVE EMPLOYER/ORGANIZATION WHICH DOWNLOADS THE RESUME/ INSERTION OR INFORMATION/DATA AND USES IT TO CONTACT THE USER. THE USER IS ADVISED TO BE CAUTIOUS OF CALLS/EMAILS ASKING FOR PAYMENT FROM OTHER WEBSITES THAT CLAIM TO OFFER SIMILAR SERVICES UNDER THE NAME OF ITWALKIN ”<br></br><br></br>

PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY. BY ACCESSING THIS WEBSITE AND ANY PAGES THEREOF, YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS OF USE BELOW AND/OR ANY SUCH TERMS AND CONDITIONS OF USE AS ARE COMMUNICATED ON THE PAGES THEREOF. IF YOU DO NOT AGREE TO THE TERMS AND CONDITIONS OF USE BELOW AND/OR ANY SUCH TERMS AND CONDITIONS OF USE AS ARE COMMUNICATED ON THE PAGES THEREOF, DO NOT ACCESS THIS WEBBSITE, OR ANY PAGES THEREOF.<br></br><br></br>

These Terms & Conditions of Use are published in accordance with the Information Technology Act, 2000 and provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011, regulations, guidelines, bye laws and notifications made thereafter that require publishing the rules and regulations, privacy policy and Terms & Conditions of Use for access or usage of this website. The domain name www.itwalkin.com (Website) is owned and operated by BlueNetworks. By accessing this Website or any of its pages, you are agreeing to these Terms & Conditions of Use.<br></br><br></br>

For the purpose of these Terms & Conditions of Use, wherever the context so requires "You" or "User" shall mean any natural or legal person who has agreed to become a User of the Website by providing Registration Data while registering on the Website as Registered User while assessing or feeding any resume and or insertion or information or data into the computers, computer systems or computer network of BlueNetworks. Website allows the User to surf the Website or making purchases without registering on the Website. The term "We", "Us", "Our" shall mean BlueNetworks.<br></br><br></br>

The Website is made available for use only by a person or individual searching for job or employment/job openings (“Job Seeker/ User”). The Website is made also available for use by various persons, individuals and/or organizations seeking information related to hiring or seeking to make available information regarding employment openings, on their behalf or other’s behalf (“Employer/ User”).<br></br><br></br>

When you use any of the services provided by Us through the Website, including but not limited to job postings, resume services etc. You will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they shall be deemed to be incorporated into this Terms & Conditions of Use and shall be considered as part and parcel of this Terms & Conditions of Use. We reserve the right, at our sole discretion, to change, modify, add or remove portions of these Terms & Conditions of Use, at any time without any prior written notice to You. It is your responsibility to review these Terms & Conditions of Use periodically for updates / changes. Your continued use of the Website following the posting of changes will mean that you accept and agree to the revisions. As long as you comply with these Terms & Conditions of Use, We grant You a personal, non-exclusive, non-transferable, limited privilege to enter and use the Website.<br></br><br></br>

We will do our utmost to ensure that availability of the Website will be uninterrupted and that transmissions will be error-free. However, due to the nature of the Internet, this cannot be guaranteed. Also, User access to the Website may also be occasionally suspended or restricted to allow for repairs, maintenance, or services at any time without prior notice. We will attempt to limit the frequency and duration of any such suspension or restriction.<br></br><br></br>

By impliedly or expressly accepting these Terms & Conditions of Use, You also accept and agree to be bound by our Policies (including but not limited to Privacy Policy) as amended from time to time.<br></br><br></br>

Links and Pages<br></br><br></br>

THIS WEBSITE MAY CONTAIN LINKS AND PAGES TO WEBSITES CONTROLLED OR OFFERED BY THIRD PARTY. WE HEREBY DISCLAIMS LIABILITY FOR, ANY INFORMATION, MATERIALS, PRODUCTS OR SERVICES POSTED OR OFFERED AT ANY OF THE THIRD PARTY WEBSITES LINKED TO THIS WEBSITE. WE DOES NOT ENDORSE OR RECOMMEND ANY PRODUCTS OR SERVICES OFFERED OR INFORMATION CONTAINED AT THAT WEBSITE, NOR WE ARE LIABLE FOR ANY FAILURE OF PRODUCTS OR SERVICES OFFERED OR ADVERTISED AT THOSE WEBSITES.<br></br><br></br>

Membership Eligibility<br></br><br></br>

Use of the Website is available only to persons who can form legally binding contracts under Indian Contract Act, 1872. Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872 including minors, un-discharged insolvents etc. are not eligible to use the Website. If you are a minor i.e. under the age of 18 years, you shall not register as a User of the Website and shall not transact on or use the Website. As a minor if you wish to use or transact on Website, such use or transaction may be made by your legal guardian or parents on the Website. We reserves the right to terminate your membership and / or refuse to provide You with access to the Website if it is brought to our notice or if it is discovered that You are under the age of 18 years.<br></br><br></br>

Your Account and Registration Obligations<br></br><br></br>

If you use the Website, You shall be responsible for maintaining the confidentiality of your Display Name, username and Password and You shall be responsible for all activities that occur under your Display Name, username and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete or We have reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, or not in accordance with the this Terms and Conditions of Use, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Website and refuse to provide You with access to the Website. Such act on your part can accrue legal implications due to violation of laws not limited to Civil and Criminal liability on your part. Further, the User agrees to indemnify Us for all losses incurred by it due to any false, distorted, manipulated, defamatory, libelous, vulgar, obscene, fraudulent or misleading facts or otherwise objectionable averments made by the User on the network of our Website.<br></br><br></br>

Communications<br></br><br></br>

When You use the Website, You may receive messages, e-mails or e-mail notifications corresponding with your activity or you send emails or provide other data, information or communication to Us electronically, You agree and understand that you are communicating with us through electronic records. You agree & share consent to receive communications via electronic records or through message /SMS from Us periodically and as and when required. We may communicate with You by e-mail, SMS, phone call or by such other mode of communication, electronic or otherwise.<br></br><br></br>

Platform for Transaction and Communication<br></br><br></br>

The Website is a platform that Users and or Job Seekers and Employers utilize for taking services with respect to services provided by us and they interact with one another for their transactions. We are not and cannot be a party to or control in any manner any transaction between the Website's Users or transaction between Job Seekers and Employers.<br></br><br></br>

Henceforward:<br></br><br></br>

* All commercial/contractual terms are offered by and agreed to between Users of the Website alone.<br></br><br></br>

* We does not make any representation or Warranty as to specifics (such as quality, value, salability, etc.) of the services proposed to be sold or offered to be sold or purchased on the Website of the third party. We accepts no liability for any errors or omissions, whether on behalf of itself or third parties.<br></br><br></br>

*Our Website or platform shall not be utilized to upload, post, e-mail, transmit or otherwise make available either directly or indirectly, any unsolicited bulk e-mail or unsolicited commercial e-mail by the User. We reserve the right to filter and monitor and block the e-mails sent by Users using the servers maintained by Us to relay e-mails. All attempts shall be made by Us and the User to abide by International Best Practices in containing and eliminating Spam.<br></br><br></br>

* Users shall not spam the database maintained by Us or indiscriminately and repeatedly forward e-mail that may be considered spam etc. Any conduct of the User in violation of this clause shall entitle Us to forthwith terminate all services to the User without notice and to forfeit any amounts paid by the User.<br></br><br></br>

*The User shall not upload, post, transmit, publish, or distribute any material or information that is unlawful, or which may potentially be perceived as being harmful, threatening, abusive, harassing, defamatory, libelous, vulgar, obscene, or racially, ethnically, or otherwise objectionable.<br></br><br></br>

*The User is solely responsible for maintaining confidentiality of the username and password and user identification and all activities and transmission performed by the User through his user identification and shall be solely responsible for carrying out any online or off-line transaction involving credit cards / debit cards / Net banking or such other forms of instruments or documents for making such transactions and We assumes no responsibility or liability for their improper use of information relating to such usage of credit cards / debit cards / Net Banking used by the User through online / off-line mode.<br></br><br></br>

* The User/Subscriber/Visitor to Our Website and/or its affiliated Websites does hereby specifically agree that User shall, at all times, comply with the requirements of the Information Technology Act, 2000 as also rules, regulations, guidelines, bye laws and notifications made thereunder, while assessing or feeding any resume/ insertion or information/data into the computers, computer systems or computer network of Us. The said User/ subscriber/ visitor to Our Website and/or its affiliated Websites does further unequivocally declare that in case User violates any provisions of the Information Technology Act, 2000 and/or rules, regulations, guidelines, byelaws and notifications made thereunder, User shall alone be responsible for all his acts, deeds and things and that User alone shall be liable for civil and criminal liability there under or under any other law for the time being in force.<br></br><br></br>

* You release and indemnify Us and/or any of its officers and representatives from any cost, damage, liability or other consequence of any of the actions of the User of the Website and specifically waive any claims that You may have in this behalf under any applicable law. Notwithstanding its reasonable efforts in that behalf, We cannot take responsibility or control the information provided by other Users which is made available on the Website. You may find other User's information to be offensive, harmful, inconsistent, inaccurate, or deceptive. Please use caution and practice safe trading when using the Website. Please note that there could be risks in dealing with underage persons or people acting under false pretence.<br></br><br></br>

* The User shall not infringe on any intellectual property rights of any person / entity or retain information / download any information from any computer system or computer network or Website or otherwise with an intention to do so.<br></br><br></br>

* We will make best efforts to do so but does not warrant that any of the Websites or any affiliate site(s) or network system linked to it is free of any operational errors nor does it warrant that it will be free of any virus, computer contaminant, worm, or other harmful components. The subscription of a User shall be subject to Quotas as applicable and as advised. E-mails provided as part of contact details are expected to be genuine and access to such e-mail accounts is available to authorised personnel only.<br></br><br></br>

* We shall not be liable for any loss or damage sustained by reason of any disclosure (inadvertent or otherwise) of any information concerning the user's account and / or information relating to or regarding online transactions using credit cards / debit cards/ Net banking and / or their verification process and particulars nor for any error, omission or inaccuracy with respect to any information so disclosed and used whether or not in pursuance of a legal process or otherwise.<br></br><br></br>

* Payments for the services offered by Us shall be on a 100% (Hundred Percent) advance basis. Refund if any will be at the sole discretion of Us. We offer no guarantees whatsoever for the accuracy or timeliness of the refunds reaching the users card/bank accounts. We give no guarantees of server uptime or applications working properly. We undertake no liability for free services.<br></br><br></br>

* In case a person using the world wide web/internet receives a spam or virus which includes a link to the Website or to any other Website maintained, operated or owned by Us, We should not be held responsible for the same. We assumes no responsibility for such e-mails.<br></br><br></br>

* We neither guarantees nor offers any warranty about the credentials bonafides, status or otherwise of the prospective employer/organization which downloads the resume/ insertion or information/data and uses it to contact the User. We would not be held liable for loss of any data technical or otherwise, or of the resume/ insertion or information/data or particulars supplied by the User due to acts of god as well as reasons beyond its control like corruption of data or delay or failure to perform as a result of any cause(s) or conditions that are beyond Our reasonable control including but not limited to strikes, riots, epidemic, pandemic, civil unrest, Govt. policies, tampering of data by unauthorized persons like hackers, distributed denial of service attacks, virus attacks, war and natural calamities.<br></br><br></br>

* We undertakes to take all reasonable precautions at its end to ensure that there is no leakage/misuse of the password granted to the User. It shall be the sole responsibility of the User to ensure that it uses the privacy setting options as it deems fit to debar / refuse access of the data fed by it, to such corporate entities individuals or consultants or employer.<br></br><br></br>

* By using this Website, You agree that We are not responsible for the content of the User’s job application, messages, e-mails and that We does not guarantee receipt of your application by the User. We do not guarantee the validity of a job listing or offer or posting and cautions You to verify the validity of a job offer or opening before taking any action. You are solely responsible for verifying the accuracy of any User or job offer or opening or listing.<br></br><br></br>

* You understand and agree that You access or attend or use telephonic interviews at your own direction and risk and that We disclaims all liability arising out of your use of such telephonic interviews.<br></br><br></br>

* User further represent that the products/services purchased are not for resale to others.<br></br><br></br>

Use of the Website<br></br><br></br>

You are requesting and authorizing Us to make available your resume to any Employer / User/ Person that may have an interest in your resume by creating a public resume through the Website. We may also automatically recommend You the jobs via the e-mail or messages. We may also share with You Job posting or listing and these recommendations may be on the basis of a variety of factors, including but not limited to, any information that You have put on the Website. You agree, undertake and confirm that your use of Website shall be strictly governed by the following binding principles:<br></br><br></br>

* You shall not host, display, upload, modify, publish, transmit, update or share any information which:<br></br><br></br>

Belongs to another person and to which You does not have any right to;<br></br><br></br>

Is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever; or unlawfully threatening or unlawfully harassing including but not limited to "indecent representation of women" within the meaning of the Indecent Representation of Women (Prohibition) Act, 1986;<br></br><br></br>

Is misleading in any way;<br></br><br></br>

Is patently offensive to the online community, such as sexually explicit content, or content that promotes obscenity, paedophilia, racism, bigotry, hatred or physical harm of any kind against any group or individual;<br></br><br></br>

Harasses or advocates harassment of another person;<br></br><br></br>

Involves the transmission of "junk mail", "chain letters", or unsolicited mass mailing or "spamming";<br></br><br></br>

Promotes illegal activities or conduct that is abusive, threatening, obscene, defamatory or libellous;<br></br><br></br>

Infringes upon or violates any third party's rights [including, but not limited to, intellectual property rights, rights of privacy (including without limitation unauthorized disclosure of a person's name, e-mail address, physical address or phone number) or rights of publicity];<br></br><br></br>

Promotes an illegal or unauthorized copy of another person's copyrighted work (see "Copyright complaint" below for instructions on how to lodge a complaint about uploaded copyrighted material), such as providing pirated computer programs or links to them, providing information to circumvent manufacture-installed copy-protect devices, or providing pirated music or links to pirated music files;<br></br><br></br>

Contains restricted or password-only access pages, or hidden pages or images (those not linked to or from another accessible page);<br></br><br></br>

Provides material that exploits people in a sexual, violent or otherwise inappropriate manner or solicits personal information from anyone;<br></br><br></br>

Provides instructional information about illegal activities such as making or buying illegal weapons, violating someone's privacy, or providing or creating computer viruses;<br></br><br></br>

Contains video, photographs, or images of another person (with a minor or an adult).<br></br><br></br>

Tries to gain unauthorized access or exceeds the scope of authorized access to the Website or to profiles, blogs, communities, account information, bulletins, friend request, or other areas of the Website or solicits passwords or personal identifying information for commercial or unlawful purposes from other users;<br></br><br></br>

Engages in commercial activities and/or sales without Our prior written consent such as contests, sweepstakes, barter, advertising and pyramid schemes, or the buying or selling of "virtual" products related to the Website. Throughout this Terms & Conditions of Use, Our prior written consent means a communication coming from our Legal Department, specifically in response to your request, and specifically addressing the activity or conduct for which you seek authorization;<br></br><br></br>

solicits gambling or engages in any gambling activity which We, in Our sole discretion, believes is or could be construed as being illegal;<br></br><br></br>

Interferes with another User's use and enjoyment of the Website or any other individual's User and enjoyment of similar services;<br></br><br></br>

Refers to any website or URL that, in Our sole discretion, contains material that is inappropriate for the Website or any other website, contains content that would be prohibited or violates the letter or spirit of these Terms & Conditions of Use.<br></br><br></br>

Harm minors in any way;<br></br><br></br>

Infringes any patent, trademark, copyright or other proprietary rights or third party's trade secrets or rights of publicity or privacy or shall not be fraudulent;<br></br><br></br>

Violates any law for the time being in force;<br></br><br></br>

Deceives or misleads the addressee/ users about the origin of such messages or communicates any information which is grossly offensive or menacing innature;<br></br><br></br>

Impersonate another person;<br></br><br></br>

Contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource; or contains any trojan horses, worms, time bombs, cancel bots, easter eggs or other computer programming routines that may damage, detrimentally interfere with, diminish value of, surreptitiously intercept or expropriate any system, data or personal information;<br></br><br></br>

Threatens the unity, integrity, defense, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation.<br></br><br></br>

Shall not be false, inaccurate or misleading;<br></br><br></br>

Shall not, directly or indirectly, offer, attempt to offer, trade or attempt to trade in any item, the dealing of which is prohibited or restricted in any manner under the provisions of any applicable law, rule, regulation or guideline for the time being in force.<br></br><br></br>

Shall not create liability for Us or cause Us to lose (in whole or in part) the services of Our internet service provider ("ISPs") or other suppliers;<br></br><br></br>

You shall not use any "deep-link", "page-scrape", "robot", "spider" or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Website or any Content, or in any way reproduce or circumvent the navigational structure or presentation of the Website or any Content, to obtain or attempt to obtain any materials, documents or information through any means not purposely made available through the Website. We reserve Our right to bar any such activity.<br></br><br></br>

You shall not attempt to gain unauthorized access to any portion or feature of the Website, or any other systems or networks connected to the Website or toany server, computer, network, or to any of the services offered on or through the Website, by hacking, password "mining" or any other illegitimate means.<br></br><br></br>

You shall not probe, scan or test the vulnerability of the Website or any network connected to the Website nor breach the security or authentication measures on the Website or any network connected to the Website. You may not reverse look-up, trace or seek to trace any information on any other User of or visitor to Website, or any other customer, including any account on the Website not owned by You, to its source, or exploit the Website or any service or information made available or offered by or through the Website, in any way where the purpose is to reveal any information, including but not limited to personal identification or information, other than Your own information, as provided for by the Website.<br></br><br></br>

You shall not make any negative, denigrating or defamatory statement(s) or comment(s) about Us or the brand name or domain name used by Us, or otherwise engage in any conduct or action that might tarnish the image or reputation, of Us on platform or otherwise tarnish or dilute any trade or service marks, trade name and/or goodwill associated with such trade or service marks, trade name as may be owned or used by us. You agree that You will not take any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Website or our systems or networks, or any systems or networks connected to Us.<br></br><br></br>

You agree not to use any device, software or routine to interfere or attempt to interfere with the proper working of the Website or any transaction being conducted on the Website, or with any other person's use of the Website.<br></br><br></br>

You may not forge headers or otherwise manipulate identifiers in order to disguise the origin of any message or transmittal You send to Us on or through the Website or any service offered on or through the Website. You may not pretend that You are, or that You represent, someone else, or impersonate any other individual or entity.<br></br><br></br>

You may not use the Website or any content for any purpose that is unlawful or prohibited by these Terms of Use, or to solicit the performance of any illegal activity or other activity which infringes the rights of ITWalkIn  and / or others.<br></br><br></br>

You shall at all times ensure full compliance with the applicable provisions of the Information Technology Act, 2000 and rules thereunder as applicable and as amended from time to time and also all applicable Domestic laws, rules and regulations (including the provisions of any applicable Exchange Control Laws or Regulations in Force) and International Laws, Foreign Exchange Laws, Statutes, Ordinances and Regulations (including, but not limited to Sales Tax/VAT, Income Tax, Octroi, Service Tax, Central Excise, Custom Duty, Local Levies), Goods and Services Tax regarding Your use of Our Website. You shall not engage in any activity, which is prohibited by the provisions of any applicable law including exchange control laws or regulations for the time being in force.<br></br><br></br>

Solely to enable Us to use the information You supply Us with, so that we are not violating any rights You might have in Your Information, You agree to grant Us a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sub-licensable (through multiple tiers) right to exercise the copyright, publicity, database rights or any other rights You have in Your Information, in any media now known or not currently known, with respect to Your Information. We will only use Your information in accordance with the Terms & Conditions of Use and Privacy Policy applicable to use of the Website.<br></br><br></br>

You shall not engage in advertising to, or solicitation of, other Users of the Website to buy or sell any products or services, including, but not limited to products or services related to that being displayed on the Website or related to us. You may not transmit any chain letters or unsolicited commercial or junk e-mail to other Users via the Website. It shall be a violation of these Terms & Conditions of Use to use any information obtained from the Website in order to harass, abuse, or harm another person, or in order to contact, advertise to, solicit, or sell to another person other than Us without Our prior explicit consent. In order to protect Our Users from such advertising or solicitation, We reserve the right to restrict the number of messages or e-mails which a User may send to other Users in any 24-hour period which We deems appropriate in its sole discretion. You understand that We have the right at all times to disclose any information (including the identity of the persons providing information or materials on the Website) as necessary to satisfy any law, regulation or valid governmental request. This may include, without limitation, disclosure of the information in connection with investigation of alleged illegal activity or solicitation of illegal activity or in response to a lawful court order or subpoena. In addition, We can (and You hereby expressly authorize Us to) disclose any information about You to law enforcement or other government officials, as we, in Our sole discretion, believe necessary or appropriate in connection with the investigation and/or resolution of possible crimes, especially those that may involve personal injury. We reserve the right, but has no obligation, to monitor the materials posted on the Website. We shall have the right to remove or edit any content that in its sole discretion violates, or is alleged to violate, any applicable law or either the spirit or letter of these Terms of Use. Notwithstanding this right, YOU REMAINSOLELY RESPONSIBLE FOR THE CONTENT OF THE MATERIALS YOU POST ON THE WEBSITE AND IN YOUR PRIVATE MESSAGES. Please be advised that such Content posted does not necessarily reflect Our views. In no event shall We assume or have any responsibility or liability for any Content posted or for any claims, damages or losses resulting from use of Content and/or appearance of Content on the Website. You hereby represent and warrant that You have all necessary rights in and to all Content which You provide and all information it contains and that such Content shall not infringe any proprietary or other rights of third parties or contain any libellous, tortious, or otherwise unlawful information.<br></br><br></br>

It is possible that other users (including unauthorized users or "hackers") may post or transmit offensive or obscene materials on the Website and that You may be involuntarily exposed to such offensive and obscene materials. It also is possible for others to obtain personal information about You due to your use of the Website, and that the recipient may use such information to harass or injure You. We does not approve of such unauthorized uses, but by using the Website You acknowledge and agree that We are not responsible for the use of any personal information that You publicly disclose or share with others on the Website. Please carefully select the type of information that You publicly disclose or share with others on the Website.<br></br><br></br>

We shall have all the rights to take necessary action and claim damages that may occur due to your involvement/participation in any way on your own or through group/s of people, intentionally or unintentionally in DoS/DDoS (Distributed Denial of Services).<br></br><br></br>

Consent to Use of Data<br></br><br></br>

You agree that We can collect certain personal information about you such as your IP Address, etc. and can automatically store it the database of the Website. However, if You register yourself on the Website, you shall be required to provide certain personal information for the registration and/or access the web pages. Such information may include, without limitation, your name, e-mail address, contact address, mobile/telephone number(s), sex, age, occupation, interests, credit card information, billing information, financial information, PAN Card, Personal Identification Proof or Card, content, IP address, standard web log information, information about your computer hardware and software and such other information as may be required for your interaction with the services and from which your identity is discernible. We may also collect demographic information that is not unique to you such as code, preferences, favorites, etc. Further, sometimes you may be asked to provide descriptive, cultural, preferential and social & life style information.( herein after referred to as INFORMATION).<br></br><br></br>

You agree and consent that any synchronization of your social media accounts with that of User account shall be available to be viewed by other recruiters, employers, User and third parties for the purposes of providing services and other related activities.<br></br><br></br>

You agree that We in accordance with our Cookie and Privacy Policy, may collect and use INFORMATION, technical data such as Your IP address, device ID, usage data and third party related information , including but not limited to technical information about your mobile device, system and application software, account details and further data in connection with such account on third party social media platforms and peripherals, that is gathered periodically to facilitate the provision of software updates, product support and other services to you related to Our mobile application or App.<br></br><br></br>

You agree and confirm that any such INFORMATION collected through your registration or opting/ purchasing any paid services/non paid services on the Website can use, transfer, process and store such INFORMATION in any manner whatsoever. The INFORMATION collected can be shared with third parties in case You register yourself on the Website or opting/ purchasing any paid services/non paid services and you herein by agreeing to this Terms & Conditions of Use and grants explicit permission and approval for the same. You agree and confirm that no sensitive/personal information has been shared by You with Us.<br></br><br></br>

You further agree and guarantee that agreeing to the Terms & Conditions of Use laid down herein, We may collect, use and share certain information regarding the contacts contained in Your mobile or device’s phone book (“Contact Information”) with other Users in accordance with Our Privacy Policy and in connection with our Services . By allowing Contact Information to be collected, You give Us a right to use that Contact Information as a part of the Service and You guarantee that You have any and all permissions required to share such Contact Information with Us. You may opt-out to prevent the sharing of Contact Information at any time.<br></br><br></br>

We also use this Contact information to enhance the experience with our Services by helping you to grow your network by: identifying your contacts that are already Members or Users of our Services; providing a template to send invitations on your behalf to your contacts that are not Members or Users; and suggesting people you may know (even if not in your contacts) but are not yet connected with you on our Services (as we may infer from your shared connections or shared managers, employers, educational institutions and other such factors). We may also use this information to show you and other Members or Users that you share the same uploaded contacts that may or may not be Members or Users.<br></br><br></br>

As between You and Us, You own the content and information that You submit or post to the Website and You are only granting Us the following non-exclusive license: A worldwide, transferable and sub-licensable right to use, copy, modify, distribute, publish, and process, information and content that You provide through our Services, without any further consent, notice and/or compensation to you or others. These rights are limited in the following ways:<br></br><br></br>

You can end this license for specific content by deleting such content from the Services, or generally by closing your account, except (a) to the extent you shared it with others as part of the Service and they copied or stored it and (b) for the reasonable time it takes to remove from backup and other systems.<br></br><br></br>

We will not include your content in advertisements for the products and services of others (including sponsored content) to others without your separate consent. However, We have the right, without compensation to you or others, to serve ads near your content and information, and your comments on sponsored content may be visible as noted in the Privacy Policy.<br></br><br></br>

We will get your consent if we want to give others the right to publish your posts beyond the Service. However, other Members or Users and/or Visitors may access and share your content and information, consistent with your settings and degree of connection with them.<br></br><br></br>

While ,We may edit and make formatting changes to your content (such as translating it, modifying the size, layout or file type or removing metadata), We will not modify the meaning of your expression.<br></br><br></br>

Because you own your content and information and we only have non-exclusive rights to it, you may choose to make it available to others, including under the terms of a Creative Commons license.<br></br><br></br>

You agree that We may access, store and use any information that you provide in accordance with the terms of the Privacy Policy.<br></br><br></br>

By submitting suggestions or other feedback regarding the Services, You agree that We can use and share (but does not have to) such feedback for any purpose without compensation to you.<br></br><br></br>

You agree to only provide content or information if that does not violate the law nor anyone's rights (e.g., without violating any intellectual property rights or breaching a contract). You also agree that your Job profile or any profile or post pr any information will be truthful. We may be required by law to remove certain information or content in certain countries.<br></br><br></br>

Contents Posted on Website<br></br><br></br>

All text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music and artwork (collectively, "Content"), is a third party user generated content and ITWalkin or BluenEtworks  has no control over such third party user generated content as Us is merely an intermediary for the purposes of this Terms & Conditions of Use.<br></br><br></br>

Except as expressly provided in these Terms & Conditions of Use, no part of the Website and no Content may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted or distributed in any way (including "mirroring") to any other computer, server, Website or other medium for publication or distribution or for any commercial enterprise, without Our express prior written consent.<br></br><br></br>

You may use information on the products and services purposely made available on the Website for downloading, provided that You (1) do not remove any proprietary notice language in all copies of such documents, (2) use such information only for your personal, non-commercial informational purpose and do not copy or post such information on any networked computer or broadcast it in any media, (3) make no modifications to any such information, and (4) do not make any additional representations or warranties relating to such documents.<br></br><br></br>

You shall be responsible for any notes, messages, emails, billboard postings, photos, drawings, profiles, opinions, ideas, images, videos, audio files or other materials or information posted or transmitted to the Website (collectively, "Content"). Such Content will become Our property and You grant Us the worldwide, perpetual and transferable rights in such Content. We shall be entitled to, consistent with Our Privacy Policy as adopted in accordance with applicable law, use the Content or any of its elements for any type of use forever, including but not limited to promotional and advertising purposes and in any media whether now known or hereafter devised, including the creation of derivative works that may include the Content You provide. You agree that any Content You post may be used by Us, consistent with Our Privacy Policy and Rules of Conduct on Website as mentioned herein, and You are not entitled to any payment or other compensation for such use.<br></br><br></br>

Privacy<br></br><br></br>

We view protection of your privacy as a very important principle. We understand clearly that You and your Personal Information is one of Our most important assets. We store and process your Information including any sensitive financial information collected (as defined under the Information Technology Act, 2000), if any, on computers that may be protected by physical as well as reasonable technological security measures and procedures in accordance with Information Technology Act 2000 and Rules there under. Our current Privacy Policy is available on the Website. If you object to your Information being transferred or used in this way, please do not use this Website.<br></br><br></br>

We and our affiliates will share / sell / transfer / license / covey some or all of your personal information with another business entity should we (or our assets) plan to merge with or are acquired by that business entity, or re-organization, amalgamation, restructuring of business or for any other reason whatsoever. Should such a transaction or situation occur, the other business entity or the new combined entity will be required to follow the Privacy Policy with respect to your personal information. Once You provide your information to us, we and our affiliate may use such information to provide you various services with respect to your transaction whether such transaction are conducted on the Website or with third party merchant's or third party merchant's website.<br></br><br></br>

Further User hereby express that it has no objection upon any call/SMS/Communication by Us, any third party on its behalf or any other party authorized by Us, communicating to User with regard to the Services & Products like Job Search, Job Alert, Shine Career Services etc or any other services of its agents. Notwithstanding User’s registration with National Do Not Call Registry (In Fully or Partly blocked category under National Customer Preference Register set up under Telecom Regulatory Authority of India), User hereby expresses his interest and accord its willful consent to receive communication (including commercial communication) in relation to Our Services. User further confirms that any communication, as mentioned hereinabove, shall not be construed as Unsolicited Commercial Communication under the TRAI guidelines and User has specifically opted to receive communication in this regard on the telephone number provided by the User.<br></br><br></br>

Disclaimer of Warranties and Liability<br></br><br></br>

This Website, all the materials and products (including but not limited to software) and services, included on or otherwise made available to You through this site are provided on "as is" and "as available" basis without any representation or warranties, express or implied except otherwise specified in writing. Without prejudice to the forgoing paragraph, We does not warrant that:<br></br><br></br>

This Website will be constantly available, or available at all; or<br></br><br></br>

The information on this Website is complete, true, accurate or non-misleading.<br></br><br></br>

We will not be liable to You in any way or in relation to the Contents of, or use of, or otherwise in connection with, the Website. We does not warrant that this Website; information, Content, materials, product (including software) or services included on or otherwise made available to You through the Website; their servers; or electronic communication sent from Us are free of viruses or other harmful components.<br></br><br></br>

All the contents of this Website are only for general information or use. They do not constitute advice and should not be relied upon in making (or refraining from making) any decision. Any specific advice or replies to queries in any part of the Website is/are the personal opinion of such experts/consultants/persons and are not subscribed to by this Website.. Certain links on the Website lead to resources located on servers maintained by third parties over whom We has no control or connection, business or otherwise as these Websites are external to Us.. We therefore neither endorses nor offers any judgement or warranty and accepts no responsibility or liability for the authenticity/availability of any of the goods/services/or for any damage, loss or harm, direct or consequential or any violation of local or international laws that may be incurred by your visit and/or transaction/s on these Websites.<br></br><br></br>

Service Payment<br></br><br></br>

While availing any of the payment method/s available on the Website, We will not be responsible or assume any liability, whatsoever in respect of any loss or damage arising directly or indirectly to You due to:<br></br><br></br>

Lack of authorization for any transaction/s, or<br></br><br></br>

Exceeding the preset limit mutually agreed by You and between "Bank/s", or<br></br><br></br>

Any payment issues arising out of the transaction, or<br></br><br></br>

Decline of transaction for any other reason/s<br></br><br></br>

All payments made against the purchases/services on Website by you shall be compulsorily in Indian Rupees acceptable in the Republic of India. Website will not facilitate transaction with respect to any other form of currency with respect to the purchases made on Website. Before shipping / delivering your order to you, We or Seller may request you to provide supporting documents (including but not limited to Govt. issued ID and address proof) to establish the ownership of the payment instrument used by you for your purchase. This is done in the interest of providing a safe online environment to Our Users.<br></br><br></br>

You have specifically authorized Us or its service providers to collect, process, facilitate and remit payments and / or the Transaction Price electronically or through Cash on Delivery to and from other Users in respect of transactions through Payment Facility. Your relationship with Us is on a principal to principal basis and by accepting these Terms & Conditions of Use you agree that We is an independent contractor for all purposes, and does not have control of or liability for the products or services that are listed on our Website that are paid for by using the Payment Facility. We does not guarantee the identity of any User nor does it ensure that a Buyer or a Seller will complete a transaction.<br></br><br></br>

You understand, accept and agree that the payment facility provided by Us is neither a banking nor financial service but is merely a facilitator providing an electronic, automated online electronic payment, receiving payment through Cash On Delivery, collection and remittance facility for the Transactions on the Website using the existing authorized banking infrastructure and Credit / Debit Card, Net banking payment gateway networks. Further, by providing Payment Facility, We neither acting as trustees nor acting in a fiduciary capacity with respect to the Transaction or the Transaction Price.<br></br><br></br>

We reserves the right to impose limits on the number of Transactions or Transaction Price which We may receive from on an individual Valid Credit/Debit/ Cash Card / Valid Bank Account/ and such other infrastructure or any other financial instrument directly or indirectly through payment aggregator or through any such facility authorized by Reserve Bank of India to provide enabling support facility for collection and remittance of payment or by an individual Buyer during any time period, and reserves the right to refuse to process Transactions exceeding such limit.<br></br><br></br>

We reserves the right to refuse to process Transactions by users with a prior history of questionable charges including without limitation breach of any agreements by the User with Us or breach/violation of any law or any charges imposed by Issuing Bank or breach of any policy.<br></br><br></br>

Compliance with Laws:<br></br><br></br>

The User shall comply with all the applicable laws (including without limitation Foreign Exchange Management Act, 1999 and the rules made and notifications issued there under and the Exchange Control Manual as may be issued by Reserve Bank of India from time to time, Customs Act, Information and Technology Act, 2000 as amended by the Information Technology (Amendment) Act 2008, Prevention of Money Laundering Act, 2002 and the rules made thereunder, Foreign Contribution Regulation Act, 1976 and the rules made there under, Income Tax Act, 1961 and the rules made there under, Export Import Policy of government of India) applicable to them respectively for using Payment Facility and the Website.<br></br><br></br>

Buyer or User's arrangement with Issuing Bank:<br></br><br></br>

All Valid Credit / Debit/ Cash Card/ and other payment instruments are processed using a Credit Card payment gateway or appropriate payment system infrastructure and the same will also be governed by the terms and conditions agreed to between the User and the respective Issuing Bank and payment instrument issuing Company.<br></br><br></br>

All Online Bank Transfers from Valid Bank Accounts are processed using the gateway provided by the respective Issuing Bank which support Payment Facility to provide these services to the Users. All such Online Bank Transfers on Payment Facility are also governed by the terms and conditions agreed to between User and the respective Issuing Bank.<br></br><br></br>

Indemnity<br></br><br></br>

You shall indemnify and hold harmless Us, our owner, licensee, affiliates, subsidiaries, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorneys' fees, made by any third party or penalty imposed due to or arising out of your breach of this Terms & Conditions of Use, Privacy Policy and other Policies, or your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.<br></br><br></br>

You shall also indemnify, defend and hold harmless Us, our employees, agents, affiliates, from any third-party claim or liability arising out of any job posting or listing or created by you, or any message sent by You. To the extent permitted by law, if You have an unpaid or outstanding invoice for or against any our Product and Services, We reserve the right to suspend or terminate your use of any Product and Services.<br></br><br></br>

Limitation of Liability<br></br><br></br>

IN NO EVENT WE WILL BE LIABLE FOR ANY DAMAGES, INCLUDING WITHOUT LIMITATION DIRECT OR INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, LOSSES OR EXPENSES ARISING IN CONNECTION WITH THIS TERMS & CONDITIONS OF USE OR WEBSITE OR ANY LINKED WEBSITE OR USE THEREOF OR INABILITY TO USE BY ANY PARTY, OR IN CONNECTION WITH ANY FAILURE OF PERFORMANCE, ERROR, OMISSION, INTERRUPTION, DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS OR LINE OR SYSTEM FAILURE, EVEN IF WE OR REPRESENTATIVES THEREOF, ARE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, LOSSES OR EXPENSES.<br></br><br></br>

Applicable Law<br></br><br></br>

Terms & Conditions of Use shall be governed by and interpreted and construed in accordance with the laws of India. The place of jurisdiction shall be exclusively in New Delhi.<br></br><br></br>

Trademark, Copyright and Restriction<br></br><br></br>

This Website is controlled and operated by Us. All material on this Website, including images, illustrations, audio clips, and video clips, are protected by copyrights, trademarks, and other intellectual property rights. Material on Website is solely for your personal, non-commercial use. You must not copy, reproduce, republish, upload, post, transmit or distribute such material in any way, including by email or other electronic means and whether directly or indirectly and You must not assist any other person or User to do so. Without the prior written consent of the owner, modification of the materials, use of the materials on any other website or networked computer environment or use of the materials for any purpose other than personal, non-commercial use is a violation of the copyrights, trademarks and other proprietary rights, and is prohibited. Any use for which, You receive any remuneration, whether in money or otherwise, is a commercial use for the purposes of this clause.<br></br><br></br>

Trademark complaint<br></br><br></br>

We respects the intellectual property of others. In case, You feel that your Trademark has been infringed, You can write to us at admin@itwalkin.com<br></br><br></br>

Contact Us<br></br><br></br>

Please contact us for any questions or comments (including all inquiries unrelated to copyright infringement) regarding this Website.<br></br><br></br>

 

POLICIES<br></br><br></br>

E-mail Abuse & Threat Policy<br></br><br></br>

Private communication, including email correspondence, is not regulated Us. We encourage its Users to be professional, courteous and respectful when communicating by e-mail.<br></br><br></br>

 

However, We will investigate and can take action on certain types of unwanted e-mails that violate our policies.<br></br><br></br>

Such instances:<br></br><br></br>

Threats of Bodily Harm - We does not permit Users to send explicit threats of bodily harm.<br></br><br></br>

Misuse of our System. We allow Users to facilitate transactions through the our system, but will investigate any misuse of this service.<br></br><br></br>

Spoof (Fake) email - We will never ask you to provide sensitive information through e-mail or message or call. In case You receive any spoof (fake) email, You are requested to report the same to Us through 'Contact Us' tab.<br></br><br></br>

Spam (Unsolicited Commercial email) - Our spam policy applies only to unsolicited commercial messages sent by the User. The User is not allowed to send spam messages to other Users.<br></br><br></br>

Offers to Buy or Sell Outside of the Website - We prohibits e-mail offers to buy or sell listed products outside of the Website. Offers of this nature are a potential fraud risk for Users. Our policy prohibits user-to-user threats of physical harm via any method including, phone, email and on Our public message boards.<br></br><br></br>

Violations of this policy may result in a range of actions, including:<br></br><br></br>

Limits on account privileges<br></br><br></br>

Account suspension<br></br><br></br>

Cancellation of listings<br></br><br></br>

Loss of special status<br></br><br></br>

Other Businesses<br></br><br></br>

 

We does not take responsibility or liability for the actions, products, content and services on the Website, which are linked to Affiliates and / or third party websites using Website's APIs or otherwise. In addition, the Website may provide links to the third party websites of Our affiliated companies and certain other businesses for which, We assumes no responsibility for examining or evaluating the products and services offered by them. We do not warrant the offerings of, any of these businesses or individuals or the content of such third party website(s). We do not endorse, in any way, any third party website(s) or content thereof.<br></br><br></br>
     
        </p>
        </div>
<img style={{marginLeft:"50%"}} id="down" onClick={()=>{goUp()}} src = {Up}/>
{screenSize.width > 750 ?
""  
        :
        <Footer/>       
}




    </div>

    // <div style={{marginLeft:"2%", marginTop:"10px"}}> {AboutUs} </div>
  )
}

export default TermsAndCondition

