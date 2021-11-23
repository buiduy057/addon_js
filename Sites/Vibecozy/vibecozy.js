var designed = false;
chrome.storage.local.get("designed", function (items) {
  designed = items.designed;
});

var trending = false;
chrome.storage.local.get("trending", function (items) {
  trending = items.trending;
});

chrome.storage.local.get("nextPage", function (item) {
  next = item.nextPage;
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
  window.location.href.indexOf("https://www.vibecozy.com") > -1 ||
  window.location.href.indexOf("https://vibecozy.com") > -1
) {
  $(window).ready(function () {
    var url_string = window.location.href;
    if (document.querySelector(".PageTitle") !== null) {
      if (url_string.indexOf("startId") !== -1) {
        let linkapi1 =
          "https://vibecozy.com/api/product/v3/products/search?startId=" +
          next +
          "&limit=12";
        // console.log(linkapi1);
        fetch(linkapi1)
          .then((response) => response.json())
          .then((reseponse2) => {
            // console.log(reseponse2);
            let product_lenght = reseponse2.data.products.length;
            let product = reseponse2.data.products;
            chrome.storage.local.clear();
            let nextPage = reseponse2.data.next;
            chrome.storage.local.set({ nextPage: nextPage });
            product.forEach(function (item, key) {
              setTimeout(function () {
                if (key === product_lenght - 1) {
                  let url_href =
                    "https://vibecozy.com/shop" + "?startId=" + nextPage;
                  // console.log(url_href);
                  window.open(url_href);
                } else {
                  let product_href = item.slug;
                  let url_href = "https://vibecozy.com/" + product_href;
                  // console.log(url_href);
                  window.open(url_href);
                }
              }, 3000 * key);
            });
          });
      } else {
        let linkapi1 =
          "https://vibecozy.com/api/product/v3/products/search?startId=&limit=12";
        fetch(linkapi1)
          .then((response) => response.json())
          .then((reseponse2) => {
            // console.log(reseponse2);
            let product_lenght = reseponse2.data.products.length;
            let product = reseponse2.data.products;
            let nextPage = reseponse2.data.next;
            chrome.storage.local.set({ nextPage: nextPage });
            product.forEach(function (item, key) {
              setTimeout(function () {
                if (key === product_lenght - 1) {
                  let url_href =
                    "https://vibecozy.com/shop" + "?startId=" + nextPage;
                  // console.log(url_href);
                  window.open(url_href);
                } else {
                  let product_href = item.slug;
                  let url_href = "https://vibecozy.com/" + product_href;
                  // console.log(url_href);
                  window.open(url_href);
                }
              }, 3000 * key);
            });
          });
      }
    } else {
      var url_string = window.location.href;
      // console.log("products");
      fetch(url_string)
        .then((response) => response.text())
        .then((response) => {
          const headText = response;
          const variants = headText.match(/__NEXT_DATA__ =(.*?)};/);
          const variantJson = JSON.parse(variants[1] + "}");
          // console.log(variantJson);
          let data = variantJson.props.pageProps.product;
          let dataVar = JSON.stringify(data);
          Json = dataVar.replace(/_id/gi, "id");
          const dataJson = JSON.parse(Json);
          // console.log(dataJson);
          let title = dataJson.title;
          let tags =
            dataJson.tags !== undefined ? dataJson.tags.toString() : "";
          let description = dataJson.description;
          let image = dataJson.images;
          let images = [];
          for (let i = 0; i <= image.length - 1; i++) {
            images.push(image[i].src);
          }
          // console.log(images);
          let id_begin = dataJson.id;
          let id_end = variantJson.props.pageProps.variantId;
          // console.log(id);
          let linkapi2 =
            "https://vibecozy.com/api/product/products/" +
            id_begin +
            "/options?v=" +
            id_end;
          fetch(linkapi2)
            .then((response) => response.json())
            .then((reseponse2) => {
              // console.log(reseponse2);
              let data = reseponse2;
              let image = data.data.attributes[0];
              // console.log(image);

              let option1_name =
                data.data.attributes[0] != undefined
                  ? data.data.attributes[0].name
                  : "";
              let option2_name =
                data.data.attributes[1] !== undefined ? "Dimension" : "";
              option1_lenght = data.data.attributes[0].values.length;
              let option1_arr = [];
              for (let i = 0; i <= option1_lenght - 1; i++) {
                option1_arr.push(data.data.attributes[0].values[i]);
              }
              option2_lenght =
                data.data.attributes[1] !== undefined
                  ? data.data.attributes[1].values.length
                  : "";
              let option2_arr = [];
              for (let i = 0; i <= option2_lenght - 1; i++) {
                option2_arr.push(data.data.attributes[1].values[i]);
              }
              let imagesthub_arr = [];
              for (let i = 0; i <= option1_lenght - 1; i++) {
                if (data.data.attributes[0].values[i].image !== undefined) {
                  imagesthub_arr.push(data.data.attributes[0].values[i].image);
                }
              }
              let images_arr = [];
              const ItemImg = $(".ProductImageCarousel img").attr("src");
              images_arr.push(ItemImg);
              // console.log(imagesthub_arr);
              if (imagesthub_arr.length > 1) {
                let variants_lenght = data.data.variants.length;
                let variants_arr = [];
                for (let i = 0; i <= variants_lenght - 1; i++) {
                  let variant = {
                    sku: i,
                    var_images: checkImageVariant(
                      option1_arr,
                      data.data.variants[i].options[0].slug,
                      data.data.variants[i].sides
                    ),
                    option1: checkOption(
                      option1_arr,
                      data.data.variants[i].options[0].slug
                    ),
                    option2:
                      option2_name !== ""
                        ? checkOption(
                            option2_arr,
                            data.data.variants[i].options[1].slug
                          )
                        : "",
                    origin_price: true,
                    price: data.data.variants[i].retail_price - 2,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants_arr.push(variant);
                }
                let listCate = ["T-SHIRTS"];
                tit = title + " " + makeid(10);
                product = {};
                ggcate = filterCategory(tit);
                product["domain"] = "customray.com";
                product["title"] = title;
                product["categories"] = listCate;
                product["google_category"] = ggcate;
                product["gender"] = "All";
                product["vender"] = "vibecozy";
                product["vender_url"] = window.location.href;
                product["description"] = description;
                product["images"] = images;
                product["variants"] = variants_arr;
                product["designed"] = -1;
                product["trending"] = trending === true ? 1 : 0;
                product["feedback"] = null;
                product["tags"] = tags;
                product["rank"] = null;
                product["vender_id"] = window.location.href;
                product["specifics"] = null;
                product["option1_name"] =
                  option1_name !== "Size" ? option1_name : "Dimension";
                product["option2_name"] = option2_name;
                product["option1_picture"] = 1;
                product["delivery_date_min"] = 5;
                product["delivery_date_max"] = 20;
                product["shipping_service_name"] = "Economy Shipping";
                product["location"] = "USA";
                // console.log(JSON.stringify(product));
                send(product, "vibecozy");
                setInterval(function () {
                  window.close();
                }, 3000);
              } else {
                let variants_lenght = data.data.variants.length;
                let variants_arr = [];
                for (let i = 0; i <= variants_lenght - 1; i++) {
                  let variant = {
                    sku: i,
                    option1: checkOption(
                      option1_arr,
                      data.data.variants[i].options[0].slug
                    ),
                    option2:
                      option2_name !== ""
                        ? checkOption(
                            option2_arr,
                            data.data.variants[i].options[1].slug
                          )
                        : "",
                    origin_price: true,
                    price: data.data.variants[i].retail_price - 2,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants_arr.push(variant);
                }
                let listCate = ["BEDDING SET & BLANKET"];
                tit = title + " " + makeid(10);
                product = {};
                ggcate = filterCategory(tit);
                product["domain"] = "customray.com";
                product["title"] = title;
                product["categories"] = listCate;
                product["google_category"] = ggcate;
                product["gender"] = "All";
                product["vender"] = "vibecozy";
                product["vender_url"] = window.location.href;
                product["description"] = description;
                product["images"] = images_arr;
                product["variants"] = variants_arr;
                product["designed"] = -1;
                product["trending"] = trending === true ? 1 : 0;
                product["feedback"] = null;
                product["tags"] = tags;
                product["rank"] = null;
                product["vender_id"] = window.location.href;
                product["specifics"] = null;
                product["option1_name"] =
                  option1_name !== "Size" ? option1_name : "Dimension";
                product["option2_name"] = option2_name;
                product["option1_picture"] = 0;
                product["delivery_date_min"] = 5;
                product["delivery_date_max"] = 20;
                product["shipping_service_name"] = "Economy Shipping";
                product["location"] = "USA";
                // console.log(JSON.stringify(product));
                send(product, "vibecozy");
                setInterval(function () {
                  window.close();
                }, 3000);
              }
            });
        });
    }
  });
}
function checkImageVariant(arr, id, arr_stt) {
  let img = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].slug) {
      let option = arr[i].image;
      let img = [];
      for (let j = 0; j <= arr_stt.length - 1; j++) {
        let item = option.replace(/front/gi, arr_stt[j]);
        if (item.indexOf("cloud0") !== -1) {
          let item_img = item.replace(/cloud0/gi, "cloudfront");
          let item_image = item_img.replace(/thumb/gi, "regular");
          img.push(item_image);
        } else if (item.indexOf("cloud1") !== -1) {
          let item_img = item.replace(/cloud1/gi, "cloudfront");
          let item_image = item_img.replace(/thumb/gi, "regular");
          img.push(item_image);
        } else {
          let item_img = item.replace(/cloud2/gi, "cloudfront");
          let item_image = item_img.replace(/thumb/gi, "regular");
          img.push(item_image);
        }
      }
      // console.log(img);
      return img;
    }
  }
}
function checkImage(arr, id) {
  let img = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].value_index) {
      let option = arr[i].variant_group_image;
      img.push(option);
      return img;
    }
  }
}
function checkOption(arr, id) {
  if (arr.length === 0) {
    let option = "";
    return option;
  } else {
    for (let i = 0; i <= arr.length - 1; i++) {
      if (id === arr[i].slug) {
        let option = arr[i].slug;
        return option;
      }
    }
  }
}

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
