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

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
function option(arr, id) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i][0]) {
      let option = arr[i][1].label;
      console.log(option);
      return option;
    }
  }
}
function option_images(arr, id) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i][0]) {
      let option = arr[i][1].src;
      if (arr[i][1].src.xs) {
        delete arr[i][1].src.xs;
      }
      const array_img = Object.values(option);
      return array_img;
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
  window.location.href.indexOf("https://b2tee.com") > -1 ||
  window.location.href.indexOf("https://b2tee.com") > -1
) {
  $(window).ready(function () {
    var url_string = window.location.href;
    let page = 1;
    if (document.querySelector(".desktop-product-title h1") === null) {
      if (url_string.indexOf("page") !== -1) {
        let begin = url_string.lastIndexOf("/");
        let end = url_string.lastIndexOf("?");
        let begin_Page = url_string.lastIndexOf("=");
        let onePage = parseInt(
          url_string.slice(begin_Page + 1, url_string.length)
        );

        let numberPage = onePage - 1;
        let category = url_string.slice(begin + 1, end);
        const headText = $("head").text();
        const variants = headText.match(/var globalStorefrontJson = (.*?)};/);
        const variantJson = JSON.parse(variants[1] + "}");
        let key = variantJson.key;
        console.log(variantJson);
        let linkapi2 =
          "https://b2tee.com/api/storefrontpage/" +
          key +
          "/campaigns?cursor=" +
          numberPage +
          "&limit=40";
        fetch(linkapi2)
          .then((response) => response.json())
          .then((reseponse2) => {
            console.log(reseponse2);
            let data = reseponse2.results;
            data.forEach(function (item, key) {
              setTimeout(function () {
                if (key === data.length - 1) {
                  let nextPage = onePage + 1;
                  let url_href =
                    "https://b2tee.com/" + category + "?page=" + nextPage;
                  console.log(url_href);
                  // window.open(url_href);
                } else {
                  let path = item.crossSellPath;
                  let url_href = "https://b2tee.com/" + path;
                  console.log(url_href);
                  // window.open(url_href);
                }
              }, 500 * key);
            });
          });
      } else {
        let begin = url_string.lastIndexOf("/");
        let category = url_string.slice(begin + 1, url_string.length);
        var url_string = window.location.href;
        const headText = $("head").text();
        const variants = headText.match(/var globalStorefrontJson = (.*?)};/);
        const variantJson = JSON.parse(variants[1] + "}");
        let key = variantJson.key;
        console.log(variantJson);
        let linkapi2 =
          "https://b2tee.com/api/storefrontpage/" +
          key +
          "/campaigns?cursor=0&limit=40";
        fetch(linkapi2)
          .then((response) => response.json())
          .then((reseponse2) => {
            let data = reseponse2.results;
            console.log(data);
            data.forEach(function (item, key) {
              setTimeout(function () {
                if (key === data.length - 1) {
                  let nextPage = page + 1;
                  let url_href =
                    "https://b2tee.com/" + category + "?page=" + nextPage;
                  console.log(url_href);
                  // window.open(url_href);
                } else {
                  let path = item.crossSellPath;
                  console.log(path);
                  let url_href = "https://b2tee.com/" + path;
                  console.log(url_href);
                }
              }, 500 * key);
            });
          });
      }
    } else {
      var url_string = window.location.href;
      const headText = $("head").text();
      const variants = headText.match(/var globalCampaign = (.*?);/);
      let vt = variants[1].lastIndexOf(',"description":"');
      let json = variants[1].slice(0, vt);
      console.log(json);
      let data = JSON.parse(json + "}");
      console.log(data);
      let title = data.name;
      if (
        title.lastIndexOf("CANVAS") !== -1 ||
        title.lastIndexOf("Canvas") !== -1
      ) {
        let description = $("#ProductDetails").text();
        let tags = data.tags.toString();
        let option1_name = "Type";
        let option2_name = "Colors";
        let option3_name = "Size";
        let images = [];
        let imageFeatured = data.variants[0].colors[0].imageFeatured;
        images.push(imageFeatured);
        let imageForEmails = data.variants[0].colors[0].imageForEmails;
        images.push(imageForEmails);
        for (
          let i = 0;
          i <= data.variants[0].colors[0].staticImages.length - 1;
          i++
        ) {
          images.push(data.variants[0].colors[0].staticImages[i]);
        }
        let text = JSON.stringify(data.variants);
        text = text.replace(/@id/gi, "id");
        dataVariants = JSON.parse(text);

        let variants_arr = [];
        for (let i = 0; i <= dataVariants.length - 1; i++) {
          for (let j = 0; j <= dataVariants[i].colors.length - 1; j++) {
            let variant = {
              sku: i,
              hex: dataVariants[i].colors[0].hex,
              var_images: checkImageArr(dataVariants[i].colors),
              option1: dataVariants[i].displayName,
              option2: dataVariants[i].colors[j].name,
              option3: dataVariants[i].name,
              origin_price: true,
              price: dataVariants[i].price.str,
              cost: dataVariants[i].price.str - 2,
              shipping_cost: 0,
              quantity: 9999,
            };
            variants_arr.push(variant);
          }
        }
        // console.log(variants_arr);
        let listCate = ["CANVAS"];
        tit = title + " " + makeid(10);
        product = {};
        ggcate = filterCategory(tit);
        product["domain"] = "customray.com";
        product["title"] = title;
        product["categories"] = listCate;
        product["google_category"] = ggcate;
        product["gender"] = "All";
        product["vender"] = "b2tee";
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
        product["option3_name"] = option3_name;
        product["option1_picture"] = 1;
        product["delivery_date_min"] = 5;
        product["delivery_date_max"] = 20;
        product["shipping_service_name"] = "Economy Shipping";
        product["location"] = "USA";
        console.log(JSON.stringify(product));
        // send(product, "b2tee");
      }
    }
  });
}
function checkImageArr(arr) {
  let img = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    let imageFeatured = arr[i].imageFeatured;
    img.push(imageFeatured);
    let imageForEmails = arr[i].imageForEmails;
    img.push(imageForEmails);
    for (let j = 0; j <= arr[i].staticImages.length - 1; j++) {
      img.push(arr[i].staticImages[j]);
    }
    // console.log(img);
    return img;
  }
}
function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
