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
    url: "https://zonesofblack.net/admin/product/create-tool",
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
  console.log("ok");
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
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  getPage();
});
if (window.location.href.indexOf("https://xx.com") > -1) {
  console.log("404");
} else if (
  window.location.href.indexOf("https://www.realwomenstore.com") > -1 ||
  window.location.href.indexOf("https://realwomenstore.com") > -1
) {
  $(window).ready(function () {
    if (window.location.href.indexOf("/tags/") > -1) {
      var url_string = window.location.href;
      var var_url = [];
      let page = 0;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          const begin = url_string.lastIndexOf("/");
          const category = url_string.slice(begin + 1, url_string.length);
          const linkapi1 = `https://www.realwomenstore.com/rest/retail-products/groups/5da0603e3657c30be3ac3b24/tag/${category}?limit=36&page=${page}recentViewAsShould=true`;
          console.log(`page=${page}`);
          const request_api = await fetch(linkapi1);
          const response = await request_api.json();
          const data = response.retailProducts;
          for (const item of data) {
            const product_href = item.campaignUrl;
            const code_href = item.code;
            const url_href = `https://www.realwomenstore.com/campaigns/-/-/tags/${category}/${product_href}?retailProductCode=${code_href}`;
            urlProducts.push(url_href);
          }
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(data);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const begin = path.lastIndexOf("/");
              const end = path.lastIndexOf("?");
              category_path = path.slice(begin + 1, end);
              // console.log(category_path);
              for (let i = 0; i <= data.length - 1; i++) {
                if (data[i].campaignUrl === category_path) {
                  data_item = data[i];
                  const title = data_item.names.design;
                  if (var_url.indexOf(title) === -1) {
                    var_url.push(title);
                    // console.log(var_url);
                    const tag = data_item.tags.campaign;
                    const tags = tag.toString();
                    let vender_url = `https://www.realwomenstore.com/campaigns/-/-/tags/${category}/${data_item.campaignUrl}?retailProductCode=${data_item.code}`;
                    const linkapi3 = `https://www.realwomenstore.com/rest/retail-products/by-campaign/${data[i].campaignUrl}?groupId=5da0603e3657c30be3ac3b24`;
                    const request_price = await fetch(linkapi3);
                    const variants_price = await request_price.json();
                    // console.log(variants_price);
                    const linkapi2 = `https://www.realwomenstore.com/rest/products/by-campaign/${data[i].campaignUrl}?groupId=5da0603e3657c30be3ac3b24`;
                    const request_item = await fetch(linkapi2);
                    const variants_item = await request_item.json();
                    // console.log(variants_item);
                    const option1_name = "Product";
                    const option2_name = "Color";
                    let option3_name = "Size";
                    let variants = [];
                    for (const item of variants_item) {
                      const { sizeChart } = item;
                      const { sizes } = sizeChart;
                      const itemVariant = {
                        option1: item.name,
                        var_images: [],
                        price: 0,
                        origin_price: true,
                      };
                      for (const colorItem of item.colors) {
                        const itemVariant2 = {
                          ...itemVariant,
                          var_images:
                            checkImageMela(
                              variants_price,
                              item.name,
                              colorItem.name
                            ) !== undefined
                              ? checkImageMela(
                                  variants_price,
                                  item.name,
                                  colorItem.name
                                )
                              : [],
                          option2: colorItem.name,
                          hex: colorItem.hex,
                        };
                        if (sizes.length) {
                          for (const sizeItem of colorItem.sizes) {
                            const sizeMap = sizes.filter(
                              (value) => value.id == sizeItem.name
                            );
                            if (!sizeMap.length) {
                              continue;
                            }
                            const itemVariant3 = {
                              ...itemVariant2,
                              option3: sizeMap[0].fields[0].value,
                              price: CheckPriceMela(
                                item.name,
                                variants_price,
                                sizeMap[0].fields[0].value
                              ),
                              cost:
                                CheckPriceMela(
                                  item.name,
                                  variants_price,
                                  sizeMap[0].fields[0].value
                                ) - 2,
                              shipping_cost: 0,
                              quantity: 9999,
                            };
                            variants.push(itemVariant3);
                          }
                        } else {
                          const itemVariant3 = {
                            ...itemVariant2,
                            option3: "Same picture",
                            price: CheckPriceMela(item.name, variants_price),
                            cost: CheckPriceMela(item.name, variants_price) - 2,
                            shipping_cost: 0,
                            quantity: 9999,
                          };
                          variants.push(itemVariant3);
                        }
                      }
                    }
                    let variants_arr = [];
                    for (const item of variants) {
                      if (item.var_images.length === 0) {
                        variants.splice(item, 1);
                      } else {
                        if (item.option1 === "Premium Fit Mens Tee") {
                          variants_arr.unshift(item);
                        } else {
                          if (variants_arr.indexOf(item) === -1) {
                            variants_arr.push(item);
                          }
                        }
                      }
                    }
                    // console.log(variants_arr);
                    const images = [];
                    images.push(variants_arr[0].var_images[0]);
                    images.push(variants_arr[0].var_images[1]);
                    let listCate = ["T-SHIRTS"];
                    tit = title + " " + makeid(10);
                    product = {};
                    ggcate = filterCategory(tit);
                    product["domain"] = "zonesofblack.net";
                    product["title"] = title + " " + makeid(10);
                    product["categories"] = listCate;
                    product["google_category"] = ggcate;
                    product["gender"] = "All";
                    product["vender"] = "realwomenstore";
                    product["vender_url"] = vender_url;
                    product["description"] = "";
                    product["images"] = images;
                    product["variants"] = variants_arr;
                    product["designed"] = -1;
                    product["trending"] = trending === true ? 1 : 0;
                    product["feedback"] = null;
                    product["tags"] = tags;
                    product["rank"] = null;
                    product["vender_id"] = data_item.code;
                    product["specifics"] = null;
                    product["option1_name"] = option1_name;
                    product["option2_name"] = option2_name;
                    product["option3_name"] =
                      option3_name !== undefined ? option3_name : "";
                    product["option1_picture"] = 1;
                    product["delivery_date_min"] = 5;
                    product["delivery_date_max"] = 20;
                    product["shipping_service_name"] = "Economy Shipping";
                    product["location"] = "USA";
                    // console.log(JSON.stringify(product));
                    send(product, "realwomenstore");
                  }
                }
                // break;
              }
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
    }
  });
}

function CheckPriceMela(id, arr, size) {
  // console.log(size);
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].names.product) {
      let price = arr[i].price / 100;
      let subrchage = 0;
      switch (size) {
        case "2XL":
          subrchage = 2;
          break;
        case "3XL":
        case "4XL":
        case "5XL":
        case "6XL":
          subrchage = 3;
          break;
      }
      return price + subrchage;
    }
  }
}

function checkImageMela(arr, name, color) {
  const var_img = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if ((name === arr[i].names.product) & (color === arr[i].color)) {
      let item = arr[i].images[0].prefix;
      let front = `${item}/regular.jpg`;
      if (front.indexOf("front") !== -1) {
        var_img.push(front);
        if (arr[i].images[1] !== undefined) {
          let rp_back = arr[i].images[1].prefix;
          let back = `${rp_back}/regular.jpg`;
          var_img.push(back);
        }
      } else {
        var_img.push(front);
      }
      return var_img;
    }
  }
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
