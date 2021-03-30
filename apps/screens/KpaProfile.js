import React from "react";
import Screen from "./Screen";

import { StyleSheet, ScrollView, useWindowDimensions } from "react-native";

import { WebView } from "react-native-webview";

import backgroundImage from "../../assets/library/background.png";

export default function KpaProfile() {
  const htmlContent = `
  
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html>
  <head>
  <title>Process Secure Payment</title>
  <meta http-equiv="content-type" content="text/html;charset=UTF-8">
  <meta name="description" content="Process Secure Payment">
  <meta name="robots" content="noindex">
  <style type="text/css">body {font-family:"Trebuchet MS",sans-serif; background-color: #FFFFFF; }#msg {border:5px solid #666; background-color:#fff; margin:20px; padding:25px; max-width:40em; -webkit-border-radius: 10px; -khtml-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;}#submitButton { text-align: center ; }#footnote {font-size:0.8em;}</style>

  </head>
  <body onload="return window.document.echoForm.submit()">
   
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em> 
    
    </body>
    </html>
`;

  const code = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><title>Process Secure Payment</title><meta http-equiv="content-type" content="text/html;charset=UTF-8"><meta name="description" content="Process Secure Payment"><meta name="robots" content="noindex"><style type="text/css">body {font-family:"Trebuchet MS",sans-serif; background-color: #FFFFFF; }#msg {border:5px solid #666; background-color:#fff; margin:20px; padding:25px; max-width:40em; -webkit-border-radius: 10px; -khtml-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;}#submitButton { text-align: center ; }#footnote {font-size:0.8em;}</style></head><body onload="return window.document.echoForm.submit()"><form name="echoForm" method="POST" action="https://authentication.cardinalcommerce.com/ThreeDSecure/V1_0_2/PayerAuthentication?issuerId=5ac7a5a524797889f4a06b8e&transactionId=WAWs7ADz7n3OWxt7ENB8UqSdLF10" accept-charset="UTF-8"><input type="hidden" name="PaReq" value="eAFVUl1vgjAUfTfxPxBeF20LGNRca3CySfyMaMweGXRCpkVLXXC/fq3C3N56zrn39PbcwrA8HowvJoos5wOTtLFpMB7nScb3A3O7eWl1zSFtNmCTCsbGIYsvglGYs6KI9szIEtWDMbZdu4dth3RMCitvzc4UKk+qLNsWoBqqVhGnEZcUovg8ChbUcbDb6QCqIByZCMYV26rFOwk8OjK6WYYr782YBfNg448B3UiI8wuX4kod7ACqAVzEgaZSnoo+QjIvTtG1zZlEgLQA6DHM6qLHKtTbyiyh24/5fuYv+WEyEXYiSfd1/fmUhsH7yh8A0hWQRJJRC1sE2zY2LNzHpE8IoBsP0VGPQ6d+aEzD1LBIr+2oFCoaTvo2716jNC39pUClLNQa6tfUCFh5yjlTxqrh9wzoMfzzROcaS5XgztsVrjf+drm93JXS9Rej7vYcJrMXgnXatyLtmKnUrI6OrQKAtA2qFqlCui1bMf8+QbPxA7iOt34="><input type="hidden" name="TermUrl" value="http://178.62.126.78:8030/api/v1/callback/3ds/bb5ba8e0fd1e45b9aefb1ba5f0a042d7"><input type="hidden" name="MD" value=""><noscript><div id="msg"><div id="submitButton"><input type="submit" value="Click here to continue" class="button"></div></div></noscript></form></body></html>`;

  const contentWidth = useWindowDimensions().width;

  return (
    <Screen
      backgroundImage={backgroundImage}
      tilte={"Profile"}
      rightIcon={"user"}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "#b0b0b0" }}>
        <WebView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            width: useWindowDimensions().width,
            height: 200,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ html: code }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 300,
    height: 200,
  },
});
