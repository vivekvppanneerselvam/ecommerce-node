
module.exports.orderTemplate = function (data) {
    return `

<html>
<body>
<table width="640" cellspacing="0" style="font:12px/16px Arial,sans-serif;color:#333;background-color:#fff;margin:0 auto" cellpadding="0"> 
<tbody>
<tr>
<td valign="top" style="padding:14px 0px 10px 20px;width:100px;border-collapse:collapse"> 
<a href="" title="Visit Amazon.in" target="_blank">
<img alt="Amazon" border="0" id="m_-8396048573232843184amazonLogo" src="https://ci5.googleusercontent.com/proxy/cmrfb6-3JDJcmMmOuECYktwOqVhb13KaOJCdqhLgBQiBghUkn_ypzHuwkmk8jgMHbWLPO3WkLxksUDlwMYmpHwnJOKzKsSXV3addPV4wBCGYO-hDXDBa_mNMsW2NBA=s0-d-e1-ft#http://g-ec2.images-amazon.com/images/G/31/x-locale/common/amazon-logo._V13" class="CToWUd"></a> 
</td> 
<td style="text-align:right;padding:0px 20px"> 
<table cellspacing="0" style="font:12px/16px Arial,sans-serif;color:#333;margin:0 auto;border-collapse:collapse" cellpadding="0"> 
<tbody>
<tr> 
<td style="border-bottom:1px solid rgb(204,204,204);width:490px;padding:0px 0px 5px 0px" class="m_-8396048573232843184topHeaderLinks"> 
<table align="right" style="border-collapse:collapse" cellspacing="0"> 
<tbody> 
<tr> 
<td style="padding:0px;vertical-align:bottom;font:12px/16px Arial,sans-serif"> 
<a href="" style="text-decoration:none;color:#006699;font-family:Arial,san-serif" target="_blank" >
Your Orders</a> 
<span style="text-decoration:none;color:#ccc;font:15px Arial,san-serif">&nbsp;|&nbsp;</span> </td> 
<td style="padding:0px;vertical-align:bottom;font:12px/16px Arial,sans-serif">
 <a href="" style="text-decoration:none;color:#006699;font-family:Arial,san-serif" target="_blank" >
 Your Account</a>
  <span style="text-decoration:none;color:#ccc;font:15px Arial,san-serif">&nbsp;|&nbsp;</span> </td> 
<td style="padding:0px;vertical-align:bottom;font:12px/16px Arial,sans-serif">
 <a href="" style="text-decoration:none;color:#006699;font-family:Arial,san-serif" target="_blank" >
 <span class="il">Amazon</span>.in</a> </td> 
</tr> 
</tbody> 
</table> 
</td> 
</tr> 
<tr> 
<td style="text-align:right;padding:7px 0px 0px 20px;width:490px"> 
<span style="font:20px Arial,san-serif">Shipping Confirmation</span> </td> 
</tr> 
<tr> 
<td style="text-align:right;padding:0px 0px 5px 20px;width:490px"> 
<span style="font-size:12px"> Order #<a href="" style="text-decoration:none;color:#006699" target="_blank" >
${data.order}</a> </span> </td> 
</tr> 
</tbody>
</table> 
</td> 
</tr> 
<tr> 
<td colspan="2" style="width:640px"> 
<p style="font:18px Arial,sans-serif;color:#cc6600;margin:15px 20px 0 20px">Hello vivek,</p> 
<p style="margin:4px 20px 18px 20px;width:640px">
We thought you'd like to know that Electronic Spices dispatched your item(s). 
Your order is on the way. If you need to return an item from this shipment or 
manage other orders, please visit <a href="">Your Orders</a> on 
<span class="il">Amazon</span>.in. </p> 
</td> 
</tr> 
<tr> 
<td colspan="2" style="padding:0 20px;width:640px"> 
<table cellspacing="0" style="border-top:3px solid #2d3741;width:640px" cellpadding="0"> 
<tbody>
<tr> 
<td valign="top" style="font:14px Arial,san-serif;padding:11px 0 14px 18px;width:280px;background-color:#efefef"> <span style="color:#666">Arriving: </span> <br> <p style="margin:2px 0 9px 0"> 
<strong style="color:#009900">Saturday, December 5</strong> </p> <a href="" target="_blank" > 
<img alt="Track your package" border="0" id="m_-8396048573232843184trackYourPackage" 
src="https://ci3.googleusercontent.com/proxy/1vPrqZf8gYg5BYsqgGH9G6faUCndhRoc3mBTbES8g4AM_eXXg1r3CbcHHvAgG4_g7-aXmE-nme8JR1DXCS0QSmPl1eleKSa1rn3G8CFjAEBFn--Z49NzAHzlbgej9InkU3UycXni=s0-d-e1-ft#https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/te/button-track.png" 
class="CToWUd"> </a>
</td> 
<td valign="top" style="font:14px Arial,san-serif;padding:11px 18px 14px 18px;width:280px;background-color:#efefef">
<span style="color:#666">Your package was sent to:</span><br> <p style="margin:2px 0"> 
<strong> Vivek<br> 
<u></u>
CHENNAI, TAMIL NADU 
<u></u> </strong> </p> 
</td> 
</tr> 
<tr> 
<td colspan="2" style="font-size:10px;color:#666;padding:0 10px 20px 10px;line-height:16px;width:640px"> 
<p style="margin:10px 0 0 0;font:11px/16px Arial,sans-serif;color:#333"> 
Your item(s) is (are) being sent by ATS. Your tracking number is: 249497645688. 
Please note that a signature may be required for the delivery of the package. 
</p> 
</td> 
</tr> 
</tbody>
</table> </td> 
</tr> 
<tr> 
<td colspan="2" style="width:640px"> 
<p style="font:18px Arial,sans-serif;color:#cc6600;border-bottom:1px solid #ccc;margin:0 20px 3px 20px;padding:0 0 3px 0"> 
Order summary </p> </td> 
</tr> 
<tr> 
<td colspan="2" id="m_-8396048573232843184shipmentDetails" 
class="m_-8396048573232843184shipmentDetails-no-asin"> 
<table width="565" cellspacing="0" cellpadding="0"> 
<tbody>
<tr> 
<td colspan="2" align="left" valign="top" style="font:12px/18px Arial,
sans-serif;padding:0 10px 0 0;color:#333;width:480px"> Item Subtotal: </td> 
<td align="left" valign="top" style="font:12px/18px Arial,
sans-serif;color:#333;width:85px;width:70%"> Rs.298.00 </td> 
</tr> 
<tr> 
<td colspan="2" align="left" valign="top" style="font:12px/18px Arial,
sans-serif;padding:0 10px 0 0;color:#333;width:480px"> Shipping &amp; Handling: </td> 
<td align="left" valign="top" style="font:12px/18px Arial,sans-serif;
color:#333;width:85px;width:70%"> Rs.79.00 </td> 
</tr> 
<tr> 
<td colspan="2" align="left" valign="top" style="font:12px/18px Arial,
sans-serif;padding:0 10px 0 0;color:#333;width:480px"> POD Convenience Fee: </td> 
<td align="left" valign="top" style="font:12px/18px Arial,
sans-serif;color:#333;width:85px;width:70%"> Rs.0.00 </td> 
</tr> 
<tr> 
<td colspan="2" align="left" valign="top" style="font:14px Arial,
sans-serif;padding:10px 10px 10px 0;color:#333;width:480px"> Shipment Total: </td> 
<td align="left" valign="top" style="color:#333;font:14px Arial,
sans-serif;padding:10px 0 5px 0;color:#333;width:85px;width:70%"> <strong> Rs.377.00 </strong> </td> 
</tr> 
<tr> 
<td colspan="2" align="left" valign="top" style="font:12px/18px Arial,sans-serif;
padding:0 10px 0 0;color:#333;width:480px"> Paid by Visa: </td> 
<td align="left" valign="top" style="color:#333;font:12px/18px Arial,
sans-serif;color:#333;width:85px;width:70%"> Rs.332.00 </td> 
</tr> 
<tr> 
<td colspan="2" align="left" valign="top" style="font:12px/18px Arial,
sans-serif;padding:0 10px 0 0;color:#333;width:480px"> Paid by 
<span class="il">Amazon</span> Payments Balance: </td> 
<td align="left" valign="top" style="color:#333;font:12px/18px Arial,
sans-serif;color:#333;width:85px;width:70%"> Rs.45.00 </td> 
</tr> 
</tbody>
</table> </td> 
</tr> 
<tr> 
<td colspan="2" style="padding:0 20px;line-height:22px;width:640px"> 
<p style="border-top:1px solid #ccc;padding:20px 0 0 0"> Track your order with the 
<a href="" style="color:#006699;text-decoration:none" target="_blank" >
<span class="il">Amazon</span> App</a>. <br> </p> </td> 
</tr> 
<tr> 
<td colspan="2" style="padding:0 20px 0 20px;line-height:22px;width:640px"> 
<p style="margin:10px 0;padding:0 0 20px 0;border-bottom:1px solid #eaeaea">
We hope to see you again soon!<br> <span style="font:14px Arial,san-serif"> 
<strong><span class="il">Amazon</span>.in</strong> </span> </p> </td> 
</tr> 
<tr> 
<td colspan="2" style="padding:0 20px 0 20px"> 
<table id="m_-8396048573232843184marketingContent"> 
<tbody>       
<tr> 
<td colspan="2" style="font-size:10px;color:#666;padding:0 20px 20px 20px;line-height:16px;width:640px"> 
<p>This email was sent from a notification-only address that cannot accept incoming email.
 Please do not reply to this message.</p> </td> 
</tr> 
</tbody>
</table>

</body>
</html>`
}