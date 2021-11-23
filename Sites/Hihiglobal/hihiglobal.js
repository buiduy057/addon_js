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
  window.location.href.indexOf("https://www.hihiglobal.com") > -1 ||
  window.location.href.indexOf("https://hihiglobal.com") > -1
) {
  $(window).ready(function () {
    var url_string = window.location.href;
    let page = 1;
    if (document.querySelector("#detail-contents h1") === null) {
      if (url_string.indexOf("page") !== -1) {
        let begin = url_string.lastIndexOf("/");
        let end = url_string.lastIndexOf("?");
        let begin_Page = url_string.lastIndexOf("=");
        let onePage = parseInt(
          url_string.slice(begin_Page + 1, url_string.length)
        );
        let category = url_string.slice(begin + 1, end);
        let linkapi1 =
          "https://www.hihiglobal.com/api/catalog/collections_v2.json?handles=" +
          category;
        fetch(linkapi1)
          .then((response) => response.json())
          .then((reseponse2) => {
            id = reseponse2.collections[0].id;
            console.log(id);
            let linkapi2 =
              "https://www.hihiglobal.com/api/catalog/products_v2.json?sort_field=name&sort_direction=asc&limit=12&page=" +
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
                        "https://www.hihiglobal.com/collections/" +
                        category +
                        "?page=" +
                        nextPage;
                      console.log(url_href);
                      // window.location.href = url_href;
                    } else {
                      let product_href = item.handle;
                      let url_href =
                        "https://www.hihiglobal.com/collections/" +
                        category +
                        "/products/" +
                        product_href;
                      console.log(url_href);
                      // window.open(url_href);
                    }
                  }, 500 * key);
                });
              });
          });
      } else {
        let begin = url_string.lastIndexOf("/");
        let category = url_string.slice(begin + 1, url_string.length);
        let linkapi1 =
          "https://www.hihiglobal.com/api/catalog/collections_v2.json?handles=" +
          category;
        fetch(linkapi1)
          .then((response) => response.json())
          .then((reseponse2) => {
            id = reseponse2.collections[0].id;
            console.log(id);
            let linkapi2 =
              "https://www.hihiglobal.com/api/catalog/products_v2.json?sort_field=name&sort_direction=asc&limit=12&page=" +
              page +
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
                      let nextPage = page + 1;
                      let url_href =
                        "https://www.hihiglobal.com/collections/" +
                        category +
                        "?page=" +
                        nextPage;
                      console.log(url_href);
                      // window.open(url_href);
                      // window.location.href = url_href;
                    } else {
                      let product_href = item.handle;
                      let url_href =
                        "https://www.hihiglobal.com/collections/" +
                        category +
                        "/products/" +
                        product_href;
                      console.log(url_href);
                      // window.open(url_href);
                    }
                  }, 500 * key);
                });
              });
          });
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
          if (jsonProduct.configurable_options.length !== 1) {
            let tags = jsonProduct.tags;
            let title = jsonProduct.name;
            let description = jsonProduct.description;
            let image = jsonProduct.media_gallery;
            let images = [];
            for (let i = 0; i <= image.length - 1; i++) {
              images.push(image[i].image);
            }
            let option1_name =
              jsonProduct.configurable_options[0].label === "Size"
                ? "Dimension"
                : "Type";
            option1_lenght = jsonProduct.configurable_options[0].values.length;
            let option1_arr = [];
            for (let i = 0; i <= option1_lenght - 1; i++) {
              option1_arr.push(jsonProduct.configurable_options[0].values[i]);
            }
            let option2_name =
              jsonProduct.configurable_options[1].label === "Size"
                ? "Dimension"
                : jsonProduct.configurable_options[1].label;
            option2_lenght =
              jsonProduct.configurable_options[1] !== undefined
                ? jsonProduct.configurable_options[1].values.length
                : "";

            let option2_arr = [];
            for (let i = 0; i <= option2_lenght - 1; i++) {
              option2_arr.push(jsonProduct.configurable_options[1].values[i]);
            }
            let option3_name =
              jsonProduct.configurable_options[2] === "Size" ? "Dimension" : "";
            option3_lenght =
              jsonProduct.configurable_options[2] !== undefined
                ? jsonProduct.configurable_options[2].values.length
                : "";

            let option3_arr = [];
            for (let i = 0; i <= option3_lenght - 1; i++) {
              option3_arr.push(jsonProduct.configurable_options[2].values[i]);
            }
            console.log(option3_arr);
            let variants_arr = [];
            if (option3_arr.length > 1) {
              let var_images = jsonProduct.media_gallery;
              if (var_images.length > 1) {
                option1_picture = 1;
              } else {
                option1_picture = 0;
              }
              let variants_lenght = jsonProduct.configurable_children.length;

              for (let i = 0; i <= variants_lenght - 1; i++) {
                let variant = {
                  sku: i,
                  option1: checkOptionVarr(
                    option1_arr,
                    jsonProduct.configurable_children[i].option1
                  ),
                  option2: checkOptionVarr(
                    option2_arr,
                    jsonProduct.configurable_children[i].option2
                  ),
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
                if (var_images.length > 1) {
                  variant.var_images = checkImageVarr(
                    image,
                    jsonProduct.configurable_children[i].id
                  );
                }
                variants_arr.push(variant);
              }
              console.log(variants_arr);
            } else {
              let var_images = jsonProduct.media_gallery;
              if (var_images.length > 1) {
                option1_picture = 1;
              } else {
                option1_picture = 0;
              }
              let variants_lenght = jsonProduct.configurable_children.length;

              for (let i = 0; i <= variants_lenght - 1; i++) {
                let variant = {
                  sku: i,
                  option1: checkOptionVarr(
                    option2_arr,
                    jsonProduct.configurable_children[i].option2
                  ),
                  option2: checkOptionVarr(
                    option1_arr,
                    jsonProduct.configurable_children[i].option1
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
                if (var_images.length > 1) {
                  variant.var_images = checkImageVarr(
                    image,
                    jsonProduct.configurable_children[i].id
                  );
                }
                variants_arr.push(variant);
              }
              console.log(variants_arr);
            }

            let listCate = ["SHIRTS"];
            tit = title + " " + makeid(10);
            product = {};
            ggcate = filterCategory(tit);
            product["domain"] = "customray.com";
            product["title"] = title;
            product["categories"] = listCate;
            product["google_category"] = ggcate;
            product["gender"] = "All";
            product["vender"] = "hihiglobal";
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
            product["option1_name"] =
              option3_arr.length > 1 ? option1_name : option2_name;
            product["option2_name"] =
              option3_arr.length > 1 ? option2_name : option1_name;
            product["option3_name"] = option3_name;
            product["option1_picture"] = option1_picture;
            product["delivery_date_min"] = 5;
            product["delivery_date_max"] = 20;
            product["shipping_service_name"] = "Economy Shipping";
            product["location"] = "USA";
            console.log(JSON.stringify(product));
            send(product, "hihiglobal");
            // setInterval(function () {
            //   window.close();
            // }, 3000);
          } else {
            let tags = jsonProduct.tags;
            let title = jsonProduct.name;
            let description = jsonProduct.description;
            let image = jsonProduct.media_gallery;
            let images = [];
            for (let i = 0; i <= image.length - 1; i++) {
              images.push(image[i].image);
            }
            let option1_name =
              jsonProduct.configurable_options[0].label === "Size"
                ? "Dimension"
                : "Type";
            option1_lenght = jsonProduct.configurable_options[0].values.length;
            let option1_arr = [];
            for (let i = 0; i <= option1_lenght - 1; i++) {
              option1_arr.push(jsonProduct.configurable_options[0].values[i]);
            }
            let variants_arr = [];
            let var_images = jsonProduct.media_gallery;
            if (var_images.length > 1) {
              option1_picture = 1;
            } else {
              option1_picture = 0;
            }
            let variants_lenght = jsonProduct.configurable_children.length;

            for (let i = 0; i <= variants_lenght - 1; i++) {
              let variant = {
                sku: i,
                option1: checkOptionVarr(
                  option1_arr,
                  jsonProduct.configurable_children[i].option1
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
              if (var_images.length > 1) {
                variant.var_images = checkImageVarr(
                  image,
                  jsonProduct.configurable_children[i].id
                );
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
            product["vender"] = "hihiglobal";
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
            product["option1_picture"] = option1_picture;
            product["delivery_date_min"] = 5;
            product["delivery_date_max"] = 20;
            product["shipping_service_name"] = "Economy Shipping";
            product["location"] = "USA";
            console.log(JSON.stringify(product));
            send(product, "hihiglobal");
            // setInterval(function () {
            //   window.close();
            // }, 3000);
          }
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
