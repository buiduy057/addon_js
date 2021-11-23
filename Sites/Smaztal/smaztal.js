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
    url: "https://api.teearechill.com/admin/product/create-tool",
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
  window.location.href.indexOf("https://www.smaztal.com") > -1 ||
  window.location.href.indexOf("https://smaztal.com") > -1
) {
  if (window.location.href.indexOf("/product-tag/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;

      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}page/${page}/`;
          // console.log(urlRequest);
          if (page > 5) return;
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(
            ".shop-container .products .image-none a"
          );
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(data);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.text();
              const title = $(bodyPath)
                .find(".product-info  h1.product-title ")
                .text();
              const variants = $(bodyPath)
                .find("form.cart")
                .attr("data-product_variations");
              const optionName = {};
              const dataVariants = JSON.parse(variants);
              const description = $(bodyPath).find("#tab-description").html();
              let tags = "Hunting,Fishing,Camping";
              let imageThub = [];
              let imageitem = $(bodyPath).find(
                ".shop-container .product-thumbnails img"
              );
              $(imageitem).each(function (_, item) {
                const Item = $(item).attr("data-src");
                imageThub.push(Item);
              });

              let images_arr = [];
              const itemImg = $(bodyPath)
                .find(
                  " .shop-container .woocommerce-product-gallery__wrapper a"
                )
                .attr("href");
              images_arr.push(itemImg);

              const itemSelect = $(bodyPath).find("form.cart select");
              let j = 1;
              for (let countFor = 0; countFor <= 1; countFor++) {
                $(itemSelect).each(function (_, item) {
                  const Item = $(item).attr("id");
                  if (countFor === 0) {
                    if (Item.indexOf("style") > -1) {
                      optionName[`option${j}_name`] = OptionSmName(
                        $(item).attr("id")
                      );
                      j += 1;
                    }
                  } else {
                    if (Item.indexOf("style") === -1) {
                      optionName[`option${j}_name`] = OptionSmName(
                        $(item).attr("id")
                      );
                      j += 1;
                    }
                  }
                });
              }
              const id = $(bodyPath).find("form.cart").attr("data-product_id");
              // console.log(optionName);
              let data_arr = [];
              $(itemSelect).each(function (_, item) {
                const Item = $(item).find(`option`);
                let arr = [];
                $(Item).each(function (_, option) {
                  const optionItem = $(option).attr("value");
                  if (optionItem !== "") {
                    itemV = {
                      option: optionItem,
                    };
                    arr.push(itemV);
                  }
                });
                data_arr.push(arr);
              });
              // console.log(data_arr);
              const dataVarr =
                dataVariants !== false ? dataVariants : data_arr[0];
              let attribute = {};
              let m = 1;
              $(itemSelect).each(function (_, option) {
                const Item = $(option).attr("name");
                attribute[`attribute${m}_name`] = Item;
                m++;
              });
              let variants_arr = [];
              let option1_picture = 0;
              for (const item of dataVarr) {
                if (dataVariants === false) {
                  for (const item02 of data_arr[1]) {
                    option1_picture = 1;
                    if (Object.keys(attribute).length > 2) {
                      for (const item03 of data_arr[2]) {
                        const formData = new FormData();
                        formData.append(
                          `${attribute.attribute1_name}`,
                          item.option
                        );
                        formData.append(
                          `${attribute.attribute2_name}`,
                          item02.option
                        );
                        formData.append(
                          `${attribute.attribute3_name}`,
                          item03.option
                        );
                        formData.append("product_id", id);
                        await fetch(
                          "https://spreadstores.com/?wc-ajax=get_variation",
                          {
                            method: "POST",
                            body: formData,
                          }
                        )
                          .then((response) => response.json())
                          .then((data) => {
                            const dataI = data;
                            if (dataI !== false) {
                              const itemVariant = {
                                sku: dataI.sku,
                                option1: OptionSmName(item.option),
                                option2: item02.option.toUpperCase(),
                                option2: item03.option.toUpperCase(),
                                var_images: CheckImgSm(dataI.image.full_src),
                                price: Number(dataI.display_price) - 1,
                                origin_price: true,
                                shipping_cost: 0,
                                quantity: 9999,
                              };
                              variants_arr.push(itemVariant);
                            }
                          });
                      }
                    } else {
                      const formData = new FormData();
                      formData.append(
                        `${attribute.attribute1_name}`,
                        item.option
                      );
                      formData.append(
                        `${attribute.attribute2_name}`,
                        item02.option
                      );
                      formData.append("product_id", id);
                      await fetch(
                        "https://spreadstores.com/?wc-ajax=get_variation",
                        {
                          method: "POST",
                          body: formData,
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          const dataI = data;
                          if (dataI !== false) {
                            const itemVariant = {
                              sku: dataI.sku,
                              option1: OptionSmName(item.option),
                              option2: item02.option.toUpperCase(),
                              var_images: CheckImgSm(dataI.image.full_src),
                              price: Number(dataI.display_price) - 1,
                              origin_price: true,
                              shipping_cost: 0,
                              quantity: 9999,
                            };
                            variants_arr.push(itemVariant);
                          }
                        });
                    }
                  }
                } else {
                  option1_picture = 0;
                  // console.log(dataVariants);
                  const itemVariant = {
                    sku: item.sku,
                    price: Number(item.display_price) - 1,
                    origin_price: true,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  let l = 1;
                  for (let countFor = 0; countFor <= 1; countFor++) {
                    for (const option in dataVariants[0].attributes) {
                      if (countFor === 0) {
                        if (option.indexOf("style") > -1) {
                          itemVariant[`option${l}`] = OptionSmName(
                            item.attributes[option]
                          );
                          l += 1;
                        }
                      } else {
                        if (option.indexOf("style") === -1) {
                          itemVariant[`option${l}`] =
                            item.attributes[option] !== ""
                              ? optionSEName01(
                                  item.attributes[option].toUpperCase()
                                )
                              : optionSEName01(size.toUpperCase());
                          l += 1;
                        }
                      }
                    }
                  }
                  variants_arr.push(itemVariant);
                }
              }
              // console.log(variants_arr);
              let listCate = ["HUNTING", "DEER HUNTING"];
              tit = title + " " + makeid(10);
              product = {
                ...optionName,
              };
              ggcate = filterCategory(tit);
              product["domain"] = `outdoorpod.shop`;
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["paybal"] = 1;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = `outdoorpod_smaztal`;
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = images_arr;
              product["variants"] = variants_arr;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = tags;
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_picture"] = option1_picture;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, `outdoorpod_smaztal`);
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
function optionSEName01(item) {
  const Item = item.replace(/%/gi, `"`);
  return Item;
}
function OptionSmName(item) {
  const Item = item.lastIndexOf("_");
  const ItemN = item.slice(Item + 1, item.length);
  const ItemChat = ItemN.charAt(0).toUpperCase() + ItemN.slice(1);
  return ItemChat;
}
function CheckImgSm(img) {
  const arr = [];
  arr.push(img);
  return arr;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
