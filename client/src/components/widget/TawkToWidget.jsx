import React, { useEffect } from "react";

function TawkToWidget() {
  useEffect(() => {
    const tawkToScript = document.createElement("script");
    tawkToScript.innerHTML = `
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/645a79976a9aad4bc579c90e/1h00mlu70';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

    `;
    document.body.appendChild(tawkToScript);
  }, []);

  return null;
}

export default TawkToWidget;
