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
  window.location.href.indexOf("https://www.dnaproud.com") > -1 ||
  window.location.href.indexOf("https://dnaproud.com") > -1
) {
  $(window).ready(function () {
    var url_string = window.location.href;
    async function getPage(page = 73) {
      try {
        let urlProducts = [];
        console.log(`page=${page}`);
        let linkapi1 =
          "https://www.dnaproud.com/api/catalog/products_v2.json?sort_field=id&sort_direction=desc&limit=12&page=" +
          page +
          "&minimal=true";

        const rq = await fetch(linkapi1);
        const bodyJson = await rq.json();
        const dataHref = bodyJson.products;
        for (const item of dataHref) {
          const href = `products/${item.handle}`;
          urlProducts.push(href);
        }
        const urlsUnique = [...new Set(urlProducts)];

        for (const path of urlsUnique) {
          try {
            // console.log(path);
            const urlProduct = `https://www.dnaproud.com/${path}`;
            const productJson = await fetch(urlProduct);
            const dataItem = await productJson.text();

            const variants = dataItem.match(
              /window\.__INITIAL_STATE__=(.*?);\(function\(\){var s;/
            );
            const variantJson = JSON.parse(variants[1]);
            let data = variantJson.customProduct.product;
            // console.log(data);
            let title = data.name;
            let tags = data.tags;
            let description = data.description;
            let image = data.media_gallery;
            let images = [];
            for (let i = 0; i <= image.length - 1; i++) {
              images.push(image[i].image);
            }
            let option1_name =
              data.configurable_options[0] !== undefined
                ? data.configurable_options[0].label
                : "";
            let option2_name =
              data.configurable_options[1] !== undefined ? "Dimension" : "";
            let option3_name =
              data.configurable_options[2] !== undefined
                ? data.configurable_options[2].label
                : "";

            option1_lenght =
              data.configurable_options[0] !== undefined
                ? data.configurable_options[0].values.length
                : "";
            let option1_arr = [];
            for (let i = 0; i <= option1_lenght - 1; i++) {
              option1_arr.push(data.configurable_options[0].values[i]);
            }
            // console.log(option1_arr);
            option2_lenght =
              data.configurable_options[1] !== undefined
                ? data.configurable_options[1].values.length
                : "";
            let option2_arr = [];
            for (let i = 0; i <= option2_lenght - 1; i++) {
              option2_arr.push(data.configurable_options[1].values[i]);
            }
            option3_lenght =
              data.configurable_options[2] !== undefined
                ? data.configurable_options[2].values.length
                : "";
            let option3_arr = [];
            for (let i = 0; i <= option3_lenght - 1; i++) {
              option3_arr.push(data.configurable_options[2].values[i]);
            }
            let variants_lenght = data.configurable_children.length;
            let variants_arr = [];
            let arr_images = [];
            for (
              let i = 0;
              i <= data.configurable_options[0].values.length - 1;
              i++
            ) {
              if (
                data.configurable_options[0].values[i].variant_group_image !==
                ""
              ) {
                arr_images.push(
                  data.configurable_options[0].values[i].variant_group_image
                );
              }
            }
            if (arr_images.length === 0) {
              option1_picture = 0;
            } else {
              option1_picture = 1;
            }
            for (let i = 0; i <= variants_lenght - 1; i++) {
              let variant = {
                sku: i,
                option1:
                  data.configurable_options[0] !== undefined
                    ? checkOptionVarr(
                        option1_arr,
                        data.configurable_children[i].option1
                      )
                    : "",
                option2:
                  data.configurable_options[1] !== undefined
                    ? checkOptionVarr(
                        option2_arr,
                        data.configurable_children[i].option2
                      )
                    : "",
                option3:
                  data.configurable_options[2] !== undefined
                    ? checkOptionVarr(
                        option1_arr,
                        data.configurable_children[i].option3
                      )
                    : "",

                var_images:
                  arr_images.length > 1
                    ? checkImageVar(image, data.configurable_children[i].id)
                    : "",

                origin_price: true,
                price: data.configurable_children[i].price,
                cost: data.configurable_children[i].price - 1,
                shipping_cost: 0,
                quantity: 9999,
              };
              variants_arr.push(variant);
            }
            // console.log(variants_arr);
            let listCate = ["OTHERS"];
            tit = title + " " + makeid(10);
            product = {};
            ggcate = filterCategory(tit);
            product["domain"] = "customray.com";
            product["title"] = title + " " + makeid(10);
            product["categories"] = listCate;
            product["google_category"] = ggcate;
            product["gender"] = "All";
            product["vender"] = "dnaproud";
            product["vender_url"] = urlProduct;
            product["description"] = description;
            product["images"] = images;
            product["variants"] = variants_arr;
            product["designed"] = -1;
            product["trending"] = trending === true ? 1 : 0;
            product["feedback"] = null;
            product["tags"] = tags != undefined ? tags : "";
            product["rank"] = null;
            product["vender_id"] = urlProduct;
            product["specifics"] = null;
            product["option1_name"] = option1_name;
            product["option2_name"] = option2_name;
            product["option3_name"] = option3_name;
            product["option1_picture"] = option1_picture;
            product["delivery_date_min"] = 5;
            product["delivery_date_max"] = 20;
            product["shipping_service_name"] = "Economy Shipping";
            product["location"] = "USA";
            // console.log(JSON.stringify(product));
            send(product, "dnaproud");

            // break;
          } catch (e) {
            console.error(e);
          } finally {
            await timeOut(800);
          }
        }
      } catch (e) {
        console.error(e);
      }
      getPage(++page);
    }
    getPage();
  });
}

function checkOptionVarr(arr, id) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].value_index) {
      let option = arr[i].label;
      return option;
    }
  }
}
function checkImageVar(arr, id) {
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

function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
