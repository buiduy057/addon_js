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
if (window.location.href.indexOf("https://xx.com") > -1) {
  console.log("deo co j");
} else if (
  window.location.href.indexOf("https://www.midtownstyles.com") > -1 ||
  window.location.href.indexOf("https://midtownstyles.com") > -1
) {
  if (window.location.href.indexOf("/product-category/") > -1) {
    console.log("midtownstyles cate");
    $(window).ready(function () {
      console.log("Get teecozi");

      var url_string = window.location.href;
      $(".products .woocommerce-loop-product__title a").each(function (
        key,
        item
      ) {
        setTimeout(function () {
          if (
            key ==
            $(".products .woocommerce-loop-product__title a").length - 1
          ) {
            let category = $(".woocommerce-products-header__title").text();
            categorys = category.toLowerCase();
            var page = 1;
            let url_string = window.location.href;
            if (url_string.indexOf("page") !== -1) {
              start = url_string.indexOf("page") + 5;
              end = url_string.length - 1;
              let nextpage = parseInt(url_string.slice(start, end));
              nextpage = nextpage + 1;
              let url = "https://midtownstyles.com/product-category/";
              let url_open = url + categorys + "/page/" + nextpage + "/";
              window.open(url_open);
            } else {
              let nextpage = page + 1;
              let url = "https://midtownstyles.com/product-category/";
              let url_open = url + categorys + "/page/" + nextpage + "/";
              window.open(url_open);
            }
          } else {
            let link = $(item).attr("href");
            window.open(link);
          }
        }, 5000 * key);
      });
    });
  }
  if (
    window.location.href.indexOf("https://midtownstyles.com/#MainContent") > -1
  ) {
    window.close();
  } else if (window.location.href.indexOf("/product/") > -1) {
    $(window).ready(function () {
      let title = $(".product_title").text();
      let description = $("#tab-description p ").text();
      let tags = "";
      let images = [];
      $(".flex-control-thumbs li img").each(function (key, item) {
        let item_img = $(".flex-control-thumbs li img").attr("src");
        item_img = item_img.replace("-150x150", "");
        images.push(item_img);
      });
      let price = $(
        ".product-details-wrapper ins .woocommerce-Price-amount bdi"
      ).text();
      price = price.replace("$", "");
      let option1_name = $(".variations tr:nth-child(1) span").eq(0).text();
      let option2_name = $(".variations tr:nth-child(2) span").eq(0).text();
      let variants = [];
      let vender_id = $(".variations_form").attr("data-product_id");
      let varians_json = $(".variations_form").attr("data-product_variations");
      lenght_varians = JSON.parse(varians_json);
      for (let i = 0; i <= lenght_varians.length - 1; i++) {
        if (lenght_varians[i].image.src != null) option1_picture = 1;
        let variant = {
          sku: i,
          var_images: lenght_varians[i].image.src,
          option1: lenght_varians[i].attributes.attribute_pa_size,
          option2: lenght_varians[i].attributes.attribute_pa_color,
          origin_price: true,
          price: parseInt(lenght_varians[i].display_regular_price),
          cost: parseInt(lenght_varians[i].display_regular_price),
          shipping_cost: 0,
          quantity: 9999,
        };
        variants.push(variant);
      }
      let listCate = ["MEN"];
      product = {};
      ggcate = "Shirts & Tops";
      product["domain"] = "customray.com";
      product["title"] = title;
      product["categories"] = listCate;
      product["google_category"] = ggcate;
      product["gender"] = "All";
      product["vender"] = "midtownstyles";
      product["vender_url"] = window.location.href;
      product["description"] = description != undefined ? description : "";
      product["images"] = images;
      product["variants"] = variants;
      product["designed"] = -1;
      product["trending"] = trending === true ? 1 : 0;
      product["feedback"] = null;
      product["tags"] = tags != undefined ? tags : "";
      product["rank"] = null;
      product["vender_id"] = vender_id;
      product["specifics"] = null;
      product["option1_name"] = option1_name;
      product["option2_name"] = option2_name;
      product["option1_picture"] = option1_picture;
      product["delivery_date_min"] = 5;
      product["delivery_date_max"] = 20;
      product["shipping_service_name"] = "Economy Shipping";
      product["location"] = "USA";
      console.log(JSON.stringify(product));
      // send(product, "midtownstyles");
    });
  }
}

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
