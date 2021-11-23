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
  window.location.href.indexOf("https://www.bestgoshop.com") > -1 ||
  window.location.href.indexOf("https://bestgoshop.com") > -1
) {
  $(window).ready(function () {
    if (window.location.href.indexOf("/products/") === -1) {
      console.log("ok");
      let url_string = window.location.href;
      if (url_string.indexOf("page") !== -1) {
        let begin = url_string.lastIndexOf("/");
        let end = url_string.lastIndexOf("?");
        let begin_Page = url_string.lastIndexOf("=");
        let onePage = parseInt(
          url_string.slice(begin_Page + 1, url_string.length)
        );
        let category = url_string.slice(begin + 1, end);
        let linkapi1 =
          "https://www.bestgoshop.com/api/catalog/collections_v2.json?handles=" +
          category;
        fetch(linkapi1)
          .then((response) => response.json())
          .then((reseponse2) => {
            console.log(reseponse2);
            let id = reseponse2.collections[0].id;
            let linkapi2 =
              "https://www.bestgoshop.com/api/catalog/products_v2.json?sort_field=created_at&sort_direction=desc&limit=12&page=" +
              onePage +
              "&minimal=true&collection_ids=" +
              id;
            fetch(linkapi2)
              .then((response) => response.json())
              .then((reseponse2) => {
                console.log(reseponse2);
                let product_lenght = reseponse2.products.length;
                let product = reseponse2.products;
                product.forEach(function (item, key) {
                  setTimeout(function () {
                    if (key === product_lenght - 1) {
                      let nextPage = onePage + 1;
                      let url_href =
                        "https://www.bestgoshop.com/collections/" +
                        category +
                        "?page=" +
                        nextPage;
                      console.log(url_href);
                      // window.location.href = url_href;
                    } else {
                      let product_href = item.handle;
                      let url_href =
                        "https://www.bestgoshop.com/collections/" +
                        category +
                        "/products/" +
                        product_href;
                      console.log(url_href);
                      // window.open(url_href);
                    }
                  }, 200 * key);
                });
              });
          });
      } else {
        let begin = url_string.lastIndexOf("/");
        let category = url_string.slice(begin + 1, url_string.length);
        let linkapi1 =
          "https://www.bestgoshop.com/api/catalog/collections_v2.json?handles=" +
          category;
        fetch(linkapi1)
          .then((response) => response.json())
          .then((reseponse2) => {
            console.log(reseponse2);
            let id = reseponse2.collections[0].id;
            let linkapi2 =
              "https://www.bestgoshop.com/api/catalog/products_v2.json?sort_field=created_at&sort_direction=desc&limit=12&page=1&minimal=true&collection_ids=" +
              id;
            fetch(linkapi2)
              .then((response) => response.json())
              .then((reseponse2) => {
                console.log(reseponse2);
                let product_lenght = reseponse2.products.length;
                let product = reseponse2.products;
                product.forEach(function (item, key) {
                  setTimeout(function () {
                    if (key === product_lenght - 1) {
                      let page = 1;
                      let nextPage = page + 1;
                      let url_href =
                        "https://www.bestgoshop.com/collections/" +
                        category +
                        "?page=" +
                        nextPage;
                      console.log(url_href);
                      // window.location.href = url_href;
                    } else {
                      let product_href = item.handle;
                      let url_href = url_string + "/products/" + product_href;
                      console.log(url_href);
                      // window.open(url_href);
                    }
                  }, 200 * key);
                });
              });
          });
      }
    } else if (window.location.href.indexOf("/products/") > -1) {
      console.log("products");
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
          let data = variantJson.customProduct.product;
          console.log(data);
          let title = data.name;
          let tags = data.tags;
          let description = data.description;
          let image = data.media_gallery;
          let images = [];
          for (let i = 0; i <= image.length - 1; i++) {
            images.push(image[i].image);
          }
          // console.log(images);
          if (data.configurable_options.length > 1) {
            let option1_name =
              data.configurable_options[0].label === "Size"
                ? "Dimension"
                : data.configurable_options[0].label;
            option1_lenght = data.configurable_options[0].values.length;
            let option1_arr = [];
            for (let i = 0; i <= option1_lenght - 1; i++) {
              option1_arr.push(data.configurable_options[0].values[i]);
            }
            // console.log(option1_arr);
            let option2_name =
              data.configurable_options[1].label === "Size"
                ? "Dimension"
                : data.configurable_options[1].label;
            option2_lenght = data.configurable_options[1].values.length;
            console.log(option2_name);
            let option2_arr = [];
            for (let i = 0; i <= option2_lenght - 1; i++) {
              option2_arr.push(data.configurable_options[1].values[i]);
            }
            // console.log(option2_arr);
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
            if (arr_images.length > 1) {
              let variants_lenght = data.configurable_children.length;
              let variants_arr = [];
              for (let i = 0; i <= variants_lenght - 1; i++) {
                let variant = {
                  sku: i,
                  option1: checkOptionVarr(
                    option1_arr,
                    data.configurable_children[i].option1
                  ),
                  option2: checkOptionVarr(
                    option2_arr,
                    data.configurable_children[i].option2
                  ),
                  origin_price: true,
                  price: data.configurable_children[i].price,
                  cost: data.configurable_children[i].price - 1,
                  shipping_cost: 0,
                  quantity: 9999,
                };
                if (arr_images.length > 1) {
                  variant.var_images = checkImageVar(
                    image,
                    data.configurable_children[i].id
                  );
                }
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
              product["vender"] = "bestgoshop_ha";
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
              product["option1_picture"] = 1;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              console.log(JSON.stringify(product));
              // send(product, "bestgoshop_ha");
              // setInterval(function () {
              //   window.close();
              // }, 1000);
              console.log(variants_arr);
            } else {
              let variants_lenght = data.configurable_children.length;
              let variants_arr = [];
              for (let i = 0; i <= variants_lenght - 1; i++) {
                let variant = {
                  sku: i,
                  option1: checkOptionVarr(
                    option2_arr,
                    data.configurable_children[i].option2
                  ),
                  option2: checkOptionVarr(
                    option1_arr,
                    data.configurable_children[i].option1
                  ),
                  origin_price: true,
                  price: data.configurable_children[i].price,
                  cost: data.configurable_children[i].price - 1,
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
              product["vender"] = "bestgoshop_ha";
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
              product["option1_name"] = option2_name;
              product["option2_name"] = option1_name;
              product["option1_picture"] = 0;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              console.log(JSON.stringify(product));
              // send(product, "bestgoshop_ha");
              // setInterval(function () {
              //   window.close();
              // }, 1000);
              // console.log(variants_arr);
            }
          } else {
            let option1_name =
              data.configurable_options[0].label === "Size"
                ? "Dimension"
                : data.configurable_options[0].label;
            option1_lenght = data.configurable_options[0].values.length;
            let option1_arr = [];
            for (let i = 0; i <= option1_lenght - 1; i++) {
              option1_arr.push(data.configurable_options[0].values[i]);
            }
            let variants_lenght = data.configurable_children.length;
            let variants_arr = [];
            for (let i = 0; i <= variants_lenght - 1; i++) {
              let variant = {
                sku: i,
                option1: checkOptionVarr(
                  option1_arr,
                  data.configurable_children[i].option1
                ),
                origin_price: true,
                price: data.configurable_children[i].price,
                cost: data.configurable_children[i].price - 1,
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
            product["vender"] = "bestgoshop_ha";
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
            product["option1_picture"] = 0;
            product["delivery_date_min"] = 5;
            product["delivery_date_max"] = 20;
            product["shipping_service_name"] = "Economy Shipping";
            product["location"] = "USA";
            console.log(JSON.stringify(product));
            // send(product, "bestgoshop_ha");
            // setInterval(function () {
            //   window.close();
            // }, 1000);
            // console.log(variants_arr);
          }
        });
    }
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

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
