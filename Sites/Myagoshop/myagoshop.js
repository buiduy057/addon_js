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
  window.location.href.indexOf("https://www.myagoshop.com") > -1 ||
  window.location.href.indexOf("https://myagoshop.com") > -1
) {
  if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      let url = window.location.href;
      let page = 1;
      if (url.indexOf("products") === -1) {
        if (url.indexOf("page") !== -1) {
          let begin = url.lastIndexOf("/");
          let end = url.lastIndexOf("?");
          let begin_Page = url.lastIndexOf("=");
          let onePage = parseInt(url.slice(begin_Page + 1, url.length));
          let category = url.slice(begin + 1, end);
          let linkapi1 =
            "https://www.myagoshop.com/api/catalog/collections_v2.json?handles=" +
            category;
          fetch(linkapi1)
            .then((response) => response.json())
            .then((reseponse2) => {
              console.log(reseponse2);
              let id = reseponse2.collections[0].id;
              console.log(id);
              let linkapi2 =
                "https://www.myagoshop.com/api/catalog/products_v2.json?sort_field=name&sort_direction=asc&limit=12&page=" +
                onePage +
                "&minimal=true&collection_ids=" +
                id;
              fetch(linkapi2)
                .then((response) => response.json())
                .then((reseponse2) => {
                  // console.log(reseponse2);
                  let product_lenght = reseponse2.products.length;
                  let product = reseponse2.products;
                  product.forEach(function (item, key) {
                    setTimeout(function () {
                      if (key === product_lenght - 1) {
                        let nextPage = onePage + 1;
                        let url_href =
                          "https://www.myagoshop.com/collections/" +
                          category +
                          "?page=" +
                          nextPage;
                        window.location.href = url_href;
                      } else {
                        let product_href = item.handle;
                        let url_href =
                          "https://www.myagoshop.com/collections/" +
                          category +
                          "/products/" +
                          product_href;
                        window.open(url_href);
                      }
                    }, 2000 * key);
                  });
                });
            });
        } else {
          let begin = url.lastIndexOf("/");
          let category = url.slice(begin + 1, url.length);
          let linkapi1 =
            "https://www.myagoshop.com/api/catalog/collections_v2.json?handles=" +
            category;
          fetch(linkapi1)
            .then((response) => response.json())
            .then((reseponse2) => {
              let id = reseponse2.collections[0].id;
              console.log(id);
              let linkapi2 =
                "https://www.myagoshop.com/api/catalog/products_v2.json?sort_field=name&sort_direction=asc&limit=12&page=" +
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
                        let url_href = url + "?page=" + nextPage;
                        window.open(url_href);
                      } else {
                        let product_href = item.handle;
                        let url_href = url + "/products/" + product_href;
                        window.open(url_href);
                      }
                    }, 3000 * key);
                  });
                });
            });
        }
      } else {
        console.log("product");
        let title = $(".product__name-product").text().trim();

        let url = window.location.href;
        let vender_id = window.location.href;
        let begin = url.lastIndexOf("/");
        let slug = url.slice(begin + 1, url.length);
        let linkapi1 =
          "https://www.myagoshop.com/api/catalog/product.json?handle=" + slug;
        fetch(linkapi1)
          .then((response) => response.json())
          .then((reseponse2) => {
            let titles = reseponse2.name;
            let id = reseponse2.id;
            let tags = reseponse2.tags;
            let images = [];
            for (let i = 0; i <= reseponse2.media_gallery.length - 1; i++) {
              images.push(reseponse2.media_gallery[i].image);
            }
            let linkapi2 =
              "https://api.shopbase.com/v1/recsys/get-cross-sell-products/v3/10120720?product_id=" +
              id +
              "&source=bundle&total_product=2";
            console.log(linkapi2);
            fetch(linkapi2)
              .then((response) => response.json())
              .then((reseponse2) => {
                console.log(reseponse2);
                let data = reseponse2.products[0];
                let description = data.description;
                console.log(description);
                let option1_name = data.options[0].label;
                let option2_name =
                  data.options[1] !== undefined ? data.options[1].label : "";
                let option1_arr = [];
                option1_lenght = data.options[0].values.length;
                option2_lenght =
                  data.options[1] !== undefined
                    ? data.options[1].values.length
                    : "";
                for (let j = 0; j <= option1_lenght - 1; j++) {
                  let product_type = data.options[0].values[j];
                  option1_arr.push(product_type);
                }
                let option2_arr = [];
                for (let j = 0; j <= option2_lenght - 1; j++) {
                  let product_type = data.options[1].values[j];
                  option2_arr.push(product_type);
                }
                let var_image = "";
                let variants_arr = [];
                let option1_picture = 0;
                let variants_lenght = data.variants.length;
                for (let i = 0; i <= variants_lenght - 1; i++) {
                  if (var_image === undefined) option1_picture = 0;
                  let variant = {
                    sku: i,
                    var_images: var_image != undefined ? var_image : "",
                    option1: option(option1_arr, data.variants[i].option1),
                    option2:
                      data.options[1] !== undefined
                        ? option(option2_arr, data.variants[i].option2)
                        : "",
                    origin_price: true,
                    price: data.variants[i].price,
                    cost: data.variants[i].price - 2,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants_arr.push(variant);
                }
                let listCate = ["BEDDING SET"];
                title = title + " " + makeid(10);
                product = {};
                ggcate = filterCategory(title);
                product["domain"] = "customray.com";
                product["title"] = titles;
                product["categories"] = listCate;
                product["google_category"] = ggcate;
                product["gender"] = "All";
                product["vender"] = "myagoshop";
                product["vender_url"] = window.location.href;
                product["description"] = description;
                product["images"] = images;
                product["variants"] = variants_arr;
                product["designed"] = -1;
                product["trending"] = trending === true ? 1 : 0;
                product["feedback"] = null;
                product["tags"] = tags != undefined ? tags : "";
                product["rank"] = null;
                product["vender_id"] = vender_id;
                product["specifics"] = null;
                product["option1_name"] = option1_name.trim();
                product["option2_name"] = option2_name.trim();
                product["option1_picture"] = option1_picture;
                product["delivery_date_min"] = 5;
                product["delivery_date_max"] = 20;
                product["shipping_service_name"] = "Economy Shipping";
                product["location"] = "USA";
                console.log(JSON.stringify(product));
                send(product, "myagoshop");
              });
          });
      }
    });
  }
}

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
