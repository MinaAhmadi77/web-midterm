//نمایش کوکی ها در باکس پاسخ
function showcookie() {
  //پیدا کردن کوکی نام و نمایش آن در المنت gendersLoad
  document.getElementById("gendersLoad").innerHTML = getCookie(
    document.getElementById("Names").value
  )

  document.getElementById("Pagestatus").innerHTML = "Load from Cookie"
}
//اضافه کردن نام  و جنسیت در کوکی
function setCookie(cname, cvalue, exdays) {
  //پیدا کردن تاریخ الان سرور
  const d = new Date()
  // فعال بودن کوکی در زمان مشخص شده
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)

  let expires = "expires=" + d.toGMTString()
  //   ذخیره در کوکی
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}
//پیدا کردن نام از کوکی ها
function getCookie(cname) {
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  //   دیکود کردن کوکی ها با ;
  let ca = decodedCookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]

    while (c.charAt(0) == " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }

  return ""
}
//حذف کوکی های نگهداری شده
function deleteAllCookies() {
  document.cookie =
    document.getElementById("Names").value +
    "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"

  //خالی کردن مفادیر نمایش داده شده در قسمت پیش بینی از کوکی
  document.getElementById("gendersLoad").innerHTML = ""
  document.getElementById("Pagestatus").innerHTML = "Cookie clear"
}
//ذخیره کوکی ها
function checkCookie() {
  user = document.getElementById("Names").value
  //نام
  setCookie(user, document.getElementById("result").value, 30)
}
//ارسال درخواست برای پیش بینی
function submit() {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {

    if (xhr.readyState === XMLHttpRequest.DONE) {
     var status = xhr.status;                    // اگر ارتباط وصل بود و مشکی سمت سرور نبود مقادیر بازگشتی چاپ می شود
    if ((status >= 200 && status < 400)) {   //چون کدهای وضعیت بیشتراز400یاکمتراز 200 نشان دهنده ریکوئست بد ویا کلا وجود مشکل است
      const obj = JSON.parse(xhr.response)

      if (obj.gender == null) {
        document.getElementById("genders").innerHTML = ""
        document.getElementById("probability").innerHTML = ""
         document.getElementById("gendersLoad").innerHTML = ""
        document.getElementById("Pagestatus").innerHTML = "Error: Name Not Found"  //اگر نام ارسالی دیتایی نداشت ودرسایت نبود، این ارور ثبت می شود
      } else {
        document.getElementById("genders").innerHTML = obj.gender
        document.getElementById("probability").innerHTML = obj.probability
        document.getElementById("Pagestatus").innerHTML = ""

        showcookie()
      }
    } else {
      // اگر با مشکل مواجه شدیم مثلا ارتباط شبکه قطع بود ارور ثبت می شود
      document.getElementById("genders").innerHTML = ""
      document.getElementById("probability").innerHTML = ""
      document.getElementById("gendersLoad").innerHTML = ""
      document.getElementById("Pagestatus").innerHTML =
        "Error:not connect to server"
    }
    }
  }
  //ارسال دستور به سرور
  xhr.open(
    "get",
    "https://api.genderize.io/?name=" +
      document.getElementById("Names").value +
      "",
    true
  )
  //ثبت header ها
  xhr.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  )
  //ارسال دستور
  xhr.send()
}
//ثبت اطلاعات جنسیت در مقدار result که به صورت hidden است
function genderresult(browser) {
  document.getElementById("result").value = browser
}
