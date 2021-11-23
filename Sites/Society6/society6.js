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

function checkOptionSociety(arr, id) {
  // console.log("ok");
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i][0]) {
      let option = arr[i][1].label;
      return option;
    }
  }
}
function CheckImages(arr, id) {
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
  window.location.href.indexOf("https://www.society6.com") > -1 ||
  window.location.href.indexOf("https://society6.com") > -1
) {
  $(window).ready(function () {
    var url_string = window.location.href;

    async function getPage(page = 1) {
      try {
        console.log(`page= ${page}`);
        let begin = url_string.lastIndexOf("/");
        let category = url_string.slice(begin + 1, url_string.length);
        let linkapi1 =
          "https://society6.com/gateway/v1/search?alias=" +
          category +
          "&page=" +
          page;
        const rq = await fetch(linkapi1);
        const body = await rq.json();

        let dataHref = body.data.attributes.cards;
        // console.log(dataHref);
        let urlProducts = [];
        for (const item of dataHref) {
          const href = `${item.card.link.href}`;
          urlProducts.push(href);
        }
        const urlsUnique = [...new Set(urlProducts)];
        for (const path of urlsUnique) {
          try {
            // console.log(path);
            let pageHref = `https://society6.com${path}`;
            const rq = await fetch(pageHref);
            const bodyPath = await rq.text();
            let begin_href = path.lastIndexOf("/");
            let end_href = path.lastIndexOf("?");
            let link_href = path.slice(begin_href + 1, end_href);
            let title = $(bodyPath).find("h1#detailsProductType ").text();
            let description = $(bodyPath)
              .find(".productDescription_productDescription_36blp")
              .html();
            let linkapi2 =
              "https://society6.com/gateway/v1/products/" + link_href;
            fetch(linkapi2)
              .then((response) => response.json())
              .then((reseponse2) => {
                let data = reseponse2.data.attributes;
                // console.log(data);
                let tag = reseponse2.links.related;
                let tags_arr = [];
                for (let i = 0; i <= tag.length - 1; i++) {
                  let item = tag[i].title;
                  tags_arr.push(item);
                }
                let tags = tags_arr.toString();
                if (Object.keys(data.attributes).length !== 1) {
                  let option1_name =
                    data.attributes.a12 != undefined
                      ? data.attributes.a12.label
                      : data.attributes.a9.label;
                  // console.log(option1_name);
                  let option2_name =
                    data.attributes.a13 != undefined
                      ? data.attributes.a13.label
                      : data.attributes.a52.label;
                  let typeProduct =
                    data.attributes.a12 != undefined
                      ? data.attributes.a12.values
                      : data.attributes.a9.values;
                  const typeProduct_arr = Object.entries(typeProduct);
                  // console.log(typeProduct_arr);
                  let sizeProduct =
                    data.attributes.a13 != undefined
                      ? data.attributes.a13.values
                      : data.attributes.a52.values;
                  const sizeProduct_arr = Object.entries(sizeProduct);
                  const variant_arr = Object.values(data.skus);
                  const images_arr = Object.entries(data.media_map);
                  // console.log(images_arr);
                  let variants_arr = [];
                  for (let i = 0; i <= variant_arr.length - 1; i++) {
                    let img_1 = CheckImages(
                      images_arr,
                      variant_arr[i].media[0]
                    );
                    let img_2 = CheckImages(
                      images_arr,
                      variant_arr[i].media[1]
                    );

                    let var_images_arrs = img_1.concat(img_2);
                    let var_images = [];
                    for (let i = 0; i <= var_images_arrs.length - 1; i++) {
                      if (var_images_arrs[i] === null) {
                        delete var_images_arrs[i];
                      } else {
                        var_images.push(var_images_arrs[i]);
                      }
                    }
                    // console.log(var_images);
                    let variant = {
                      sku: i,
                      option1:
                        data.attributes.a12 != undefined
                          ? checkOptionSociety(
                              typeProduct_arr,
                              variant_arr[i].attributes.a12
                            )
                          : "",
                      option2:
                        data.attributes.a13 != undefined
                          ? checkOptionSociety(
                              sizeProduct_arr,
                              variant_arr[i].attributes.a13
                            )
                          : checkOptionSociety(
                              sizeProduct_arr,
                              variant_arr[i].attributes.a52
                            ),
                      var_images: var_images,
                      origin_price: true,
                      price: variant_arr[i].discount_price,
                      cost: variant_arr[i].discount_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(variant);
                  }
                  // console.log(variants_arr);
                  let listCate = ["FRAMED ART PRINTS"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "customray.com";
                  product["title"] = title;
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "society";
                  product["vender_url"] = path;
                  product["description"] = description;
                  product["images"] = variants_arr[0].var_images;
                  product["variants"] = variants_arr;
                  product["designed"] = -1;
                  product["trending"] = trending === true ? 1 : 0;
                  product["feedback"] = null;
                  product["tags"] = tags != undefined ? tags : "";
                  product["rank"] = null;
                  product["vender_id"] = path;
                  product["specifics"] = null;
                  product["option1_name"] = option1_name;
                  product["option2_name"] = option2_name;
                  product["option1_picture"] = 1;
                  product["delivery_date_min"] = 5;
                  product["delivery_date_max"] = 20;
                  product["shipping_service_name"] = "Economy Shipping";
                  product["location"] = "USA";
                  console.log(JSON.stringify(product));
                  // send(product, "society");
                  // setInterval(function () {
                  //   window.close();
                  // }, 1000);
                } else {
                  let option1_name =
                    data.attributes.a26 != undefined
                      ? data.attributes.a26.label
                      : data.attributes.a1.label;
                  let typeProduct =
                    data.attributes.a26 != undefined
                      ? data.attributes.a26.values
                      : data.attributes.a1.values;
                  const typeProduct_arr = Object.entries(typeProduct);
                  // console.log(typeProduct_arr);
                  const variant_arr = Object.values(data.skus);

                  const images_arr = Object.entries(data.media_map);
                  if (images_arr.length === 0) {
                    option1_picture = 0;
                  } else {
                    option1_picture = 1;
                  }
                  let variants_arr = [];
                  for (let i = 0; i <= variant_arr.length - 1; i++) {
                    let img_1 = CheckImages(
                      images_arr,
                      variant_arr[i].media[0]
                    );
                    // console.log(img_1);
                    let img_2 = CheckImages(
                      images_arr,
                      variant_arr[i].media[1]
                    );
                    // console.log(img_2);
                    let var_images_arrs = img_1.concat(img_2);
                    let var_images = [];
                    for (let i = 0; i <= var_images_arrs.length - 1; i++) {
                      if (var_images_arrs[i] === null) {
                        delete var_images_arrs[i];
                      } else {
                        var_images.push(var_images_arrs[i]);
                      }
                    }
                    // console.log(var_images);
                    let variant = {
                      sku: i,
                      option1:
                        data.attributes.a26 !== undefined
                          ? checkOptionSociety(
                              typeProduct_arr,
                              variant_arr[i].attributes.a26
                            )
                          : checkOptionSociety(
                              typeProduct_arr,
                              variant_arr[i].attributes.a1
                            ),
                      origin_price: true,
                      price: variant_arr[i].discount_price,
                      cost: variant_arr[i].discount_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    if (var_images.length > 0) {
                      variant.var_images = var_images;
                    }
                    variants_arr.push(variant);
                  }
                  let listCate = ["FRAMED ART PRINTS"];
                  tit = title + " " + makeid(10);
                  product = {};
                  ggcate = filterCategory(tit);
                  product["domain"] = "customray.com";
                  product["title"] = title;
                  product["categories"] = listCate;
                  product["google_category"] = ggcate;
                  product["gender"] = "All";
                  product["vender"] = "society";
                  product["vender_url"] = window.location.href;
                  product["description"] = description;
                  product["images"] = variants_arr[0].var_images;
                  product["variants"] = variants_arr;
                  product["designed"] = -1;
                  product["trending"] = trending === true ? 1 : 0;
                  product["feedback"] = null;
                  product["tags"] = tags != undefined ? tags : "";
                  product["rank"] = null;
                  product["vender_id"] = path;
                  product["specifics"] = null;
                  product["option1_name"] = option1_name;
                  product["option1_picture"] = 0;
                  product["delivery_date_min"] = 5;
                  product["delivery_date_max"] = 20;
                  product["shipping_service_name"] = "Economy Shipping";
                  product["location"] = "USA";
                  // console.log(JSON.stringify(product));
                  send(product, "society");
                  // setInterval(function () {
                  //   window.close();
                  // }, 1000);
                }
              });
            break;
          } catch (e) {
            console.error(e);
          } finally {
            await timeOut(800);
          }
        }
      } catch (e) {
        console.error(e);
      }
      // getPage(++page);
    }
    getPage();
  });
}

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
