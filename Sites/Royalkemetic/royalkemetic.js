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
  window.location.href.indexOf("https://www.royalkemetic.shop.com") > -1 ||
  window.location.href.indexOf("https://royalkemetic.shop") > -1
) {
  if (window.location.href.indexOf("/shop") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}?page=${page}`;
          // console.log(urlRequest);
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(".paginated-listings .listing a");
          // console.log(productItem);
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });

          const urlsUnique = [...new Set(urlProducts)];
          // console.log(urlsUnique);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const requestPath = `${path}`;
              const rqPath = await fetch(requestPath);
              const bodyPath = await rqPath.text();
              const variants = bodyPath.match(
                /window\.PatternContext\.ContactFormData = (.*?)}};/
              );
              const variantJson = JSON.parse(variants[1] + "}}");
              let data = variantJson;
              const title = variantJson.listing.title;
              const images = variantJson.listing.images;
              const description = variantJson.listing.description;
              const tags = variantJson.listing.tags.toString();
              const formItem = $(bodyPath).find(
                ".listing-purchase-box form .custom-select"
              );
              let arr_1 = [];
              let arr_2 = [];
              let variants_arr = [];
              const test = $(bodyPath).find('[name="listing_variation_id"]');
              let option1_name = "";
              let option2_name = "";
              if (test.length > 1) {
                option1_name = "Colors";
                option2_name = "Dimension";
                const labelCheck = formItem
                  .eq(0)
                  .find("select option")
                  .eq(0)
                  .text()
                  .trim();
                if (
                  labelCheck === "Primary color" ||
                  labelCheck === "Colors" ||
                  labelCheck === "Zipper color"
                ) {
                  const Item_01 = formItem.eq(0).find("select option");
                  // console.log(Item_01);
                  $(Item_01).each(function (_, item) {
                    // console.log(item);
                    const Item = $(item).text().trim();
                    if (Item.indexOf("(") !== -1) {
                      const ItemN = Item.slice(0, Item.indexOf("(")).trim();
                      arr_1.push(ItemN);
                    } else {
                      arr_1.push(Item);
                    }
                  });
                  arr_1.shift();
                  const Item_02 = formItem.eq(1).find("select option");
                  // console.log(Item_02);
                  $(Item_02).each(function (_, item) {
                    // console.log(item);
                    let colorsItemArr = [];
                    const Item = $(item).text().trim();
                    if (Item.indexOf("(") !== -1) {
                      const ItemN = Item.slice(0, Item.indexOf("(")).trim();
                      if (Item.indexOf("-") !== -1) {
                        const ItemPrice = Item.slice(
                          Item.indexOf("(") + 4,
                          Item.indexOf("-")
                        );
                        colorsItemArr.push(ItemPrice);
                      } else {
                        const ItemPrice = Item.slice(
                          Item.indexOf("(") + 4,
                          Item.length - 1
                        );
                        colorsItemArr.push(ItemPrice);
                      }
                      colorsItemArr.push(ItemN);
                    } else {
                      colorsItemArr.push(Item);
                    }
                    arr_2.push(colorsItemArr);
                  });
                  arr_2.shift();
                  // console.log(arr_2);
                } else {
                  const Item_01 = formItem.eq(0).find("select option");
                  // console.log(Item_01);
                  $(Item_01).each(function (_, item) {
                    // console.log(item);
                    let colorsItemArr = [];
                    const Item = $(item).text().trim();
                    if (Item.indexOf("(") !== -1) {
                      const ItemN = Item.slice(0, Item.indexOf("(")).trim();
                      if (Item.indexOf("-") !== -1) {
                        const ItemPrice = Item.slice(
                          Item.indexOf("(") + 4,
                          Item.indexOf("-")
                        );
                        colorsItemArr.push(ItemPrice);
                      } else {
                        const ItemPrice = Item.slice(
                          Item.indexOf("(") + 4,
                          Item.length - 1
                        );
                        colorsItemArr.push(ItemPrice);
                      }
                      colorsItemArr.push(ItemN);
                    } else {
                      colorsItemArr.push(Item);
                    }
                    arr_2.push(colorsItemArr);
                  });
                  arr_2.shift();
                  const Item_02 = formItem.eq(1).find("select option");
                  $(Item_02).each(function (_, item) {
                    // console.log(item);
                    const Item = $(item).text().trim();
                    if (Item.indexOf("(") !== -1) {
                      const ItemN = Item.slice(0, Item.indexOf("(")).trim();
                      arr_1.push(ItemN);
                    } else {
                      arr_1.push(Item);
                    }
                  });
                  arr_1.shift();
                }
                const price$ = $(bodyPath).find(".listing-price").text();
                const price = Number(
                  price$.slice(price$.indexOf("$") + 1, price$.length)
                );
                for (const item_1 of arr_1) {
                  // console.log(item_1);
                  for (const item_2 of arr_2) {
                    const itemVariant = {
                      option1: item_1,
                      option2: item_2[1] !== undefined ? item_2[1] : item_2[0],
                      price:
                        item_2[1] !== undefined
                          ? Number(item_2[0]) - 2
                          : price - 2,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants_arr.push(itemVariant);
                  }
                }
              } else if (test.length === 1) {
                option1_name = "Dimension";
                const Item_01 = formItem.eq(0).find("select option");
                // console.log(Item_01);
                $(Item_01).each(function (_, item) {
                  // console.log(item);
                  const Item = $(item).text().trim();
                  arr_1.push(Item);
                });
                arr_1.shift();
                const price$ = $(bodyPath).find(".listing-price").text();
                const price = Number(
                  price$.slice(price$.indexOf("$") + 1, price$.length)
                );
                for (const item_1 of arr_1) {
                  const itemVariant = {
                    option1: item_1,
                    price: price - 2,
                    origin_price: true,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants_arr.push(itemVariant);
                }
              } else {
                const price$ = $(bodyPath).find(".listing-price").text();
                const price = Number(
                  price$.slice(price$.indexOf("$") + 1, price$.length)
                );
                const itemVariant = {
                  price: price - 2,
                  origin_price: true,
                  shipping_cost: 0,
                  quantity: 9999,
                };
                variants_arr.push(itemVariant);
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
              product["vender"] = "royalkemetic";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = images;
              product["variants"] = variants_arr;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = tags;
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_name"] = option1_name;
              product["option2_name"] = option2_name;
              product["option1_picture"] = 0;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, "royalkemetic");
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
}
function checkPriceRo(item) {
  const begin = item.indexOf("$");
  const end = item.indexOf("+");
  const price = item.slice(begin + 1, end - 1);
  return price;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
