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
  window.location.href.indexOf("https://www.sweetgiftsfamily.com") > -1 ||
  window.location.href.indexOf("https://sweetgiftsfamily.com") > -1
) {
  $(window).ready(function () {
    if (document.querySelector(".breadcrumbs-title") !== null) {
      console.log("vao");
      if (window.location.href.indexOf("/collections/") > -1) {
        console.log("ok");
        var url_string = window.location.href;
        let page = 1;
        if (url_string.indexOf("page") !== -1) {
          let begin_Page = url_string.lastIndexOf("=");
          let onePage = parseInt(
            url_string.slice(begin_Page + 1, url_string.length)
          );
          let begin = url_string.lastIndexOf("/");
          let end = url_string.lastIndexOf("?");
          let category = url_string.slice(begin + 1, end);
          let linkapi1 =
            "https://www.sweetgiftsfamily.com/collections/" +
            category +
            "?page=" +
            onePage;
          console.log(linkapi1);
          fetch(linkapi1)
            .then((response) => response.text())
            .then((response) => {
              const headText = response;
              const variants = headText.match(
                /window\.__INITIAL_STATE__=(.*?);\(function\(\){var s;/
              );

              const variantJson = JSON.parse(variants[1]);
              console.log(variantJson);
              data = variantJson.collection.products;
              console.log(data);
              data.forEach(function (item, key) {
                setTimeout(function () {
                  if (key === data.length - 1) {
                    let nextpage = onePage + 1;
                    console.log(nextpage);
                    let url_open =
                      "https://www.sweetgiftsfamily.com/collections/" +
                      category +
                      "?page=" +
                      nextpage;
                    console.log(url_open);
                    window.location.href = url_open;
                  } else {
                    let path = item.handle;
                    let url_href =
                      "https://www.sweetgiftsfamily.com/collections/" +
                      category +
                      "/products/" +
                      path;
                    // console.log(url_href);
                    window.open(url_href);
                  }
                }, 3000 * key);
              });
            });
        } else {
          console.log("trang 2");
          let begin = url_string.lastIndexOf("/");
          let category = url_string.slice(begin + 1, url_string.length);
          let linkapi1 =
            "https://www.sweetgiftsfamily.com/collections/" + category;
          fetch(linkapi1)
            .then((response) => response.text())
            .then((response) => {
              const headText = response;
              const variants = headText.match(
                /window\.__INITIAL_STATE__=(.*?);\(function\(\){var s;/
              );
              const variantJson = JSON.parse(variants[1]);
              data = variantJson.collection.products;
              data.forEach(function (item, key) {
                setTimeout(function () {
                  if (key === data.length - 1) {
                    let nextpage = parseInt(page) + 1;
                    let url_open =
                      "https://www.sweetgiftsfamily.com/collections/" +
                      category +
                      "?page=" +
                      nextpage;
                    window.open(url_open);
                  } else {
                    let path = item.handle;
                    let url_href = url_string + "/products/" + path;
                    window.open(url_href);
                  }
                }, 3000 * key);
              });
            });
        }
      }
    } else {
      var url_string = window.location.href;
      console.log("products");
      fetch(url_string)
        .then((response) => response.text())
        .then((response) => {
          const headText = response;
          const variants = headText.match(
            /window\.__INITIAL_STATE__=(.*?);\(function\(\){var s;/
          );

          const variantJson = JSON.parse(variants[1]);

          let jsonProduct = variantJson.customProduct.product;
          console.log(jsonProduct);
          let tags = jsonProduct.tags;
          let title = jsonProduct.name;
          let description = jsonProduct.description;
          let image = jsonProduct.media_gallery;
          let images = [];
          for (let i = 0; i <= image.length - 1; i++) {
            images.push(image[i].image);
          }
          console.log(images);
          let option1_name =
            jsonProduct.configurable_options[0].label != undefined
              ? jsonProduct.configurable_options[0].label
              : "";
          option1_lenght = jsonProduct.configurable_options[0].values.length;
          console.log(option1_name);
          let option1_arr = [];
          for (let i = 0; i <= option1_lenght - 1; i++) {
            option1_arr.push(jsonProduct.configurable_options[0].values[i]);
          }

          let option2_name = jsonProduct.configurable_options[1].label;
          option2_lenght = jsonProduct.configurable_options[1].values.length;

          let option2_arr = [];
          for (let i = 0; i <= option2_lenght - 1; i++) {
            option2_arr.push(jsonProduct.configurable_options[1].values[i]);
          }

          let option3_name =
            jsonProduct.configurable_options[2].label === "Size"
              ? "Dimension"
              : "";
          option3_lenght = jsonProduct.configurable_options[2].values.length;

          let option3_arr = [];
          for (let i = 0; i <= option3_lenght - 1; i++) {
            option3_arr.push(jsonProduct.configurable_options[2].values[i]);
          }
          let arr_images = [];
          for (
            let i = 0;
            i <= jsonProduct.configurable_options[0].values.length - 1;
            i++
          ) {
            arr_images.push(
              jsonProduct.configurable_options[0].values[i].variant_group_image
            );
          }
          if (arr_images.length > 1) {
            option1_picture = 1;
          } else {
            option1_picture = 0;
          }
          let variants_lenght = jsonProduct.configurable_children.length;
          let variants_arr = [];
          for (let i = 0; i <= variants_lenght - 1; i++) {
            let variant = {
              sku: i,
              var_images: checkImageVarr(
                image,
                jsonProduct.configurable_children[i].id
              ),
              option1: checkOptionVarr(
                option1_arr,
                jsonProduct.configurable_children[i].option1
              ),
              option2:
                arr_images.length !== 1
                  ? checkOptionVarr(
                      option2_arr,
                      jsonProduct.configurable_children[i].option2
                    )
                  : "",
              option3: checkOptionVarr(
                option3_arr,
                jsonProduct.configurable_children[i].option3
              ),
              origin_price: true,
              price: jsonProduct.configurable_children[i].price,
              cost: jsonProduct.configurable_children[i].price - 2,
              shipping_cost: 0,
              quantity: 9999,
            };
            if (variant.option2 === "") {
              option2_name = "";
            }
            variants_arr.push(variant);
          }
          let listCate = ["BEDDING SET COLLECTION"];
          tit = title + " " + makeid(10);
          product = {};
          ggcate = filterCategory(tit);
          product["domain"] = "customray.com";
          product["title"] = title;
          product["categories"] = listCate;
          product["google_category"] = ggcate;
          product["gender"] = "All";
          product["vender"] = "sweetgiftsfamily";
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
          product["option1_picture"] = option1_picture;
          product["delivery_date_min"] = 5;
          product["delivery_date_max"] = 20;
          product["shipping_service_name"] = "Economy Shipping";
          product["location"] = "USA";
          console.log(JSON.stringify(product));
          send(product, "sweetgiftsfamily");
          setInterval(function () {
            window.close();
          }, 1000);
        });
    }
  });
}
function checkOptionVarr(arr, id) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].value_index) {
      if (arr[i].label !== "All over print") {
        let option = arr[i].label;
        return option;
      } else {
        let option = "";
        return option;
      }
    }
  }
}
function checkImageVarr(arr, id) {
  console.log(arr);
  let img = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = 0; j <= arr.length - 1; j++) {
      if (id === arr[i].variant_ids[j]) {
        let option = arr[i].image;
        img.push(option);
        return img;
      }
    }
  }
}

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
