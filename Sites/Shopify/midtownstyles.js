var designed = false;
chrome.storage.local.get("designed", function (items) {
  designed = items.designed;
});

var trending = false;
chrome.storage.local.get("trending", function (items) {
  trending = items.trending;
});
// FUNCTION
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

function get(name) {
  if (
    (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
      location.search
    ))
  )
    return decodeURIComponent(name[1]);
}

function send(item, vender) {
  console.log(item);
  $.ajax({
    url: "https://api.zonesofblack.net/admin/product/create-tool",
    type: "post",
    dataType: "text",
    data: {
      item: JSON.stringify(item),
    },

    vender: vender,
    success: function (data) {
      console.log(data);
      // console.log(this.next);
      window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      window.close();
    },
  });
}

function send_update(atokproduct_id) {
  $.ajax({
    url: "https://asyourprint.sale/admin/product/update-tool",
    type: "post",
    dataType: "text",
    data: {
      atokproduct_id: atokproduct_id,
    },
    success: function (data) {
      console.log(data);
      // console.log(this.next);
      // window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      window.close();
    },
  });
}

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// if (window.location.href.indexOf("https://xx.com") > -1) {
//   console.log("deo co j");
// } else if (
//   window.location.href.indexOf("https://www.midtownstyles.com") > -1 ||
//   window.location.href.indexOf("https://midtownstyles.com") > -1
// ) {
//   if (
//     window.location.href.indexOf("https://midtownstyles.com/#MainContent") > -1
//   ) {
//     window.close();
//   } else if (window.location.href.indexOf("/product/") > -1) {
//     $(window).ready(function () {
//       console.log("midtownstyles");
//       // dataTong = JSON.parse($('script[type="application/json"][data-product-json]').text());
//       // console.log(JSON.stringify(dataTong));
//       // data = dataTong["product"];
//       // description = data.description;
//       // console.log(description);
//       // variants = [];
//       // tags = "";
//       // console.log(data.vendor);
//       // console.log(data.options);
//       // let titleitem = data.title;
//       // titleitem = titleitem + " " + makeid(8);
//       // option1_name = data.options[0] != undefined ? data.options[0] : "";
//       // option2_name = data.options[1] != undefined ? data.options[1] : "";
//       // option1_picture = 0;
//       // data.tags.forEach(function (tag, tag_key) {
//       //   if (tags != "") tags = tags + ", ";
//       //   tags = tags + tag;
//       // });
//       // data.images.forEach(function (image, image_key) {
//       //   data.images[image_key] = "https:" + image;
//       // });
//       // data.variants.forEach(function (variant, variant_key) {
//       //   if (variant.featured_image != null) option1_picture = 1;
//       //   listImgaevar = [];
//       //   listImgaevar.push(variant.featured_image != null ? variant.featured_image.src : data.images[0]);
//       //   variant = {
//       //     //sku: variant.sku,
//       //     var_images: listImgaevar,
//       //     option1: variant.option1,
//       //     option2: variant.option2,
//       //     origin_price: true,
//       //     price: parseFloat(variant.price / 100).toFixed(2) - 1,
//       //     cost: parseFloat(variant.price / 100).toFixed(2) - 1,
//       //     shipping_cost: 0,
//       //     quantity: 9999,
//       //   };
//       //   variants.push(variant);
//       // });
//       // listCate = [];
//       // listCate.push("MUGS");
//       // listCate.push("NURSE");
//       // product = {};
//       // ggcate = "Home & Garden > Kitchen & Dining > Tableware > Drinkware > Mugs";
//       // product["store"] = true;
//       // product["domain"] = "customray.com";
//       // product["title"] = titleitem;
//       // product["categories"] = listCate;
//       // product["google_category"] = ggcate;
//       // product["gender"] = "All";
//       // product["vender"] = "mysoulandspirit";
//       // product["vender_url"] = window.location.href;
//       // product["description"] = description != undefined ? description : data.content;
//       // product["images"] = data.images;
//       // product["variants"] = variants;
//       // product["designed"] = -1;
//       // product["trending"] = trending === true ? 1 : 0;
//       // product["feedback"] = null;
//       // product["tags"] = tags;
//       // product["rank"] = null;
//       // product["vender_id"] = data.id;
//       // product["specifics"] = null;
//       // product["option1_name"] = option1_name;
//       // product["option2_name"] = option2_name;
//       // product["option1_picture"] = option1_picture;
//       // product["delivery_date_min"] = 5;
//       // product["delivery_date_max"] = 20;
//       // product["shipping_service_name"] = "Economy Shipping";
//       // product["location"] = "USA";
//       // console.log(JSON.stringify(product));
//       // send(product, "mysoulandspirit");
//     });
//   }
// }

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
