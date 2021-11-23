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
  // console.log(item);
  $.ajax({
    url: "https://api.customray.com/admin/product/create-tool",
    type: "post",
    dataType: "text",
    data: {
      item: JSON.stringify(item),
    },

    vender: vender,
    success: function (data) {
      console.log(data);
      // console.log(this.next);
      // window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      // window.close();
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

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
function option(arr, id) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].id) {
      let option = arr[i].label;
      return option;
    }
  }
}
function option_images(arr, id) {
  let img = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].id) {
      let option = arr[i].group_image;
      img.push(option);
      return img;
    }
  }
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
  console.log("404");
} else if (
  window.location.href.indexOf("https://www.awesoman.com") > -1 ||
  window.location.href.indexOf("https://awesoman.com") > -1
) {
  if (window.location.href.indexOf("/collections/") > -1) {
    console.log("ok");
    $(window).ready(function () {
      $(
        ".collection-product__wrapper .common__product-gap a.product-snippet__img-wrapper"
      ).each(function (key, item) {
        setTimeout(function () {
          console.log(key);
          if (
            key ===
            $(
              ".collection-product__wrapper .common__product-gap a.product-snippet__img-wrapper"
            ).length -
              1
          ) {
            console.log("trang 2");
            let page = 1;
            url_string = window.location.href;
            if (url_string.indexOf("page") !== -1) {
              let begin_Page = url_string.lastIndexOf("=");
              let begin_category = url_string.lastIndexOf("/");
              let end_category = url_string.lastIndexOf("?");
              let category = url_string.slice(begin_category + 1, end_category);
              let nextpage = parseInt(
                url_string.slice(begin_Page + 1, url_string.length)
              );
              nextpage = nextpage + 1;
              let url = "https://awesoman.com/collections/";
              let url_open = url + category + "?page=" + nextpage;
              console.log(url_open);
              window.location.href = url_open;
            } else {
              let nextpage = page + 1;
              let url_open = url_string + "?page=" + nextpage;
              console.log(url_open);
              window.open(url_open);
            }
          } else {
            let url_item = $(item).attr("href");
            window.open(url_item);
            console.log(url_item);
          }
        }, 3000 * key);
      });
    });
  } else if (window.location.href.indexOf("/products/") > -1) {
    console.log("products");
    var url_string = window.location.href;
    console.log("products");
    fetch(url_string)
      .then((response) => response.text())
      .then((response) => {
        const headText = response;
        const variants = headText.match(
          /\$\("\.product-detail-1539149753700"\)\.product_detail\((.*?) }\);/
        );
        rep_01 = variants[1].replace(/section_id/gi, '"section_id"');
        rep_02 = rep_01.replace(/default_img/gi, '"default_img"');
        rep_03 = rep_02.replace(/,product:/gi, ',"product":');
        rep_04 = rep_03.replace(/initialSlide/gi, '"initialSlide"');
        rep_05 = rep_04.replace(/ajax/gi, '"ajax"');
        const variantJson = JSON.parse(rep_05 + "}");
        let data = variantJson.product;
        console.log(data);
        let title = data.title;
        let description = data.description;
        let image = data.images;
        let images = [];
        for (let i = 0; i <= image.length - 1; i++) {
          images.push(image[i].src);
        }
        let tags = data.tags;
        let option1_name = data.options[0].name;
        let option2_name = data.options[1].name === "Size" ? "Dimension" : "";
        let variants_arr = [];
        let var_images = [];

        let variants_lenght = data.variants.length;
        for (let i = 0; i <= variants_lenght - 1; i++) {
          if (var_images.indexOf(data.variants[i].image.src) === -1) {
            console.log(data.variants[i].image.src);
            var_images.push(data.variants[i].image.src);
          }
        }
        console.log(var_images);
        for (let i = 0; i <= variants_lenght - 1; i++) {
          let variant = {
            sku: i,
            option1: data.variants[i].option1,
            option2:
              data.variants[i].option2 !== "SAME AS THE PICTURE"
                ? data.variants[i].option2
                : "",
            origin_price: true,
            price: data.variants[i].price,
            cost: data.variants[i].price - 2,
            shipping_cost: 0,
            quantity: 9999,
          };
          if (variant.option2 === "") {
            option1_name = "";
          }
          if (var_images.length > 1) {
            variant.var_images = checkImageVarr(data.variants[i].image.src);
          }
          if (var_images.length > 1) {
            option1_picture = 1;
          } else {
            option1_picture = 0;
          }
          variants_arr.push(variant);
        }

        console.log(variants_arr);
        let listCate = ["SHIRTS"];
        tit = title + " " + makeid(10);
        product = {};
        ggcate = filterCategory(tit);
        product["domain"] = "customray.com";
        product["title"] = title;
        product["categories"] = listCate;
        product["google_category"] = ggcate;
        product["gender"] = "All";
        product["vender"] = "awesoman";
        product["vender_url"] = window.location.href;
        product["description"] = description;
        product["images"] = images;
        product["variants"] = variants_arr;
        product["designed"] = -1;
        product["trending"] = trending === true ? 1 : 0;
        product["feedback"] = null;
        product["tags"] = tags != undefined ? tags : "";
        product["rank"] = null;
        product["vender_id"] = window.location.href;
        product["specifics"] = null;
        product["option1_name"] = option1_name;
        product["option2_name"] = option2_name;
        product["option1_picture"] = option1_picture;
        product["delivery_date_min"] = 5;
        product["delivery_date_max"] = 20;
        product["shipping_service_name"] = "Economy Shipping";
        product["location"] = "USA";
        console.log(JSON.stringify(product));
        send(product, "awesoman");
        setInterval(function () {
          window.close();
        }, 1000);
      });
  }
}
function checkImageVarr(image) {
  let img = [];
  img.push(image);
  return img;
}

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
