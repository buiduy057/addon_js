var designed = false;
chrome.storage.local.get('designed', function(items) {
    designed = items.designed;
});

var trending = false;
chrome.storage.local.get('trending', function(items) {
    trending = items.trending;
});
// FUNCTION	
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}


function send(item, vender) {
    console.log(item);
    $.ajax({
        url: 'https://api.winterluckpod.com/admin/product/create-tool',
        type: "post",
        dataType: "text",
        data: {
            item: JSON.stringify(item),
        },

        vender: vender,
        success: function(data) {
            console.log(data);
            // console.log(this.next);
            window.close();

        },
        error: function(request, error) {
            console.log(data);

            // var url_string  = window.location.href;
            // window.location.href = url_string;
            window.close();
        }
    });
}

function send_update(atokproduct_id) {
    $.ajax({
        url: 'https://asyourprint.sale/admin/product/update-tool',
        type: "post",
        dataType: "text",
        data: {
            atokproduct_id: atokproduct_id,
        },
        success: function(data) {
            console.log(data);
            // console.log(this.next);
            // window.close();

        },
        error: function(request, error) {
            console.log(data);

            // var url_string  = window.location.href;
            // window.location.href = url_string;
            window.close();
        }
    });
}

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}
if (window.location.href.indexOf("https://xx.com") > -1) {
    console.log("deo co j")
}
// https://meowpinky
else if ((window.location.href.indexOf("meowpinky.com") > -1) || (window.location.href.indexOf("https://www.meowpinky.com") > -1)) {

    console.log('meowpinky');
    if (window.location.href.indexOf("https://meowpinky.com/#MainContent") > -1) {
        window.close();
    } else if (window.location.href.indexOf("/product/") > -1) {

        $(window).ready(function() {
            (async() => {
                await timeout(3000);
                function titleCase(str) {
                    
                    return str.charAt(0).toUpperCase() + str.slice(1);; 
                 }
                nodechar = $(".woocommerce-breadcrumb").find('a').eq(1).text().toUpperCase();
                nodecon = $(".woocommerce-breadcrumb").find('a').eq(2).text().toUpperCase();
                
                listCate = [];
                

                if(nodechar) listCate.push(nodechar);
                if(nodecon) listCate.push(nodecon);

                if (listCate.length == 0){
                    
                    listCate.push('All');
                }

                const dataJson = $(".variations_form ").attr('data-product_variations');

                if(dataJson == 'false') {
                    console.log('ko co!');
                    
                    window.close();
                    return;
                }

                data = JSON.parse(dataJson);

                console.log(JSON.stringify(data));
                description = $("#tab-description").html()
            
                product_type = (data.type != '' ? data.type : data.tags[0]);
                tags = '';
                
                content = $("head").html();
                content1 = content.split('"tags":"');
                if (content1[1] != undefined) {
                    content2 = content1[1].split('"}');
                    tags = content2[0].trim();
                }
                console.log(tags);
                images = []
               
                $(".woocommerce-product-gallery__image").each(function(image_key, image) {
                    images[image_key] = $(image).find('a').attr('href');
                });
                console.log(images)
                variants = [];
                option1_name = "";
                option2_name = "";
                const objetAttr = Object.keys(data[0].attributes);
                const opname1 = objetAttr[0];//atribute_pa_style
                let nameOption1 = opname1
                let ahiihi = nameOption1.split('attribute_pa_')[1]
                if(ahiihi == undefined){
                    nameOption1 = nameOption1.split('attribute_')[1].replace('-',' ').toUpperCase()
                }
                else{
                    nameOption1 = nameOption1.split('attribute_pa_')[1].replace('-',' ').toUpperCase()
                }
                console.log(opname1)
                console.log(nameOption1)


                const opname2 = objetAttr[1];

                if(!opname2) {
                    console.log('1 option')
                    
                    option1_name = nameOption1;
                
                    option2_name = null
                    data.forEach(function(variant, variant_key) {
                        //console.log(variant);
                    
                        Imagevar = variant.image.url
                        listImagevar = []
                        listImagevar.push(Imagevar);

                        variantOne = {
                            'option1': variant.attributes[opname1].toUpperCase(),
                            
                            'option2': 'None',
                            'origin_price': true,
                            'price': parseFloat(variant.display_price) - 2,
                            'cost': parseFloat(variant.display_price) - 2,
                            'shipping_cost': 0,
                            'var_images': listImagevar,
                            'quantity': 9999
                        };
                        variants.push(variantOne);
                      
                    });

                }else{
                    console.log('2 option')
                    let nameOption2 = opname2
                    nameOption2 = nameOption2.split('attribute_pa_')[1].replace('-',' ').toUpperCase()
                   
                    console.log(nameOption2)
                    option1_name = nameOption1;
                    option2_name = nameOption2;
                    data.forEach(function(variant, variant_key) {
                        //console.log(variant);
                    
                        Imagevar = variant.image.url
                        listImagevar = []
                        listImagevar.push(Imagevar)
                        variantOne = {
                            'option1': variant.attributes[opname1].toUpperCase(),
                            'option2': variant.attributes[opname2].toUpperCase(),
                            'origin_price': true,
                            'price': parseFloat(variant.display_price) - 2,
                            'cost': parseFloat(variant.display_price) - 2,
                            'shipping_cost': 0,
                            'var_images': listImagevar,
                            'quantity': 9999
                        };
                        variants.push(variantOne);
                      
                    });
                }
                //console.log(variants);

                

            

                option1_picture = 0;

                ttt = $(".product_title").text()
                //ttt = ttt + Math.random().toString(36).substr(1, 2);;
                //console.log(variants);
                //listCate = [];
                ggcate = ""
                if(ttt.indexOf('Quilt')!= -1 || ttt.indexOf('Blanket')!= -1){
                    ggcate = "Home & Garden > Linens & Bedding > Bedding >"
                }else {
                    ggcate = "Apparel & Accessories > Clothing"
                }

                const textinput = $('.tmcp-field-wrap');
                var textResult = textinput.length ? 1 : 0;

                //listCate.push(catalog2);
                console.log(variants);
                //console.log(variants);
                const domain = "winterluckpod.com"
                product = {};
                product['store'] = true;
                product['domain'] = domain;
                product['customdesign'] = textResult;
                product['google_category'] = ggcate;
                product['title'] = ttt;
                product['categories'] = listCate;
                product['gender'] = 'All';
                product['vender'] = 'meowpinky';
                product['vender_url'] = window.location.href;
                product['description'] = (description != undefined ? description : null);
                product['images'] = images;
                product['variants'] = variants;
                product['designed'] = -1;
                product['trending'] = (trending === true ? 1 : 0);
                product['feedback'] = null;
                product['tags'] = tags;
                product['rank'] = null;
                product['delivery_date_min'] = 5;
                product['delivery_date_max'] = 20;
                product['option1_name'] = option1_name;
                product['option2_name'] = option2_name;
                product['option1_picture'] = 0;
                product['shipping_service_name'] = 'Economy Shipping';
                product['location'] = 'USA';
                product['vender_id'] = $(".variations_form ").attr('data-product_id');
                product['specifics'] = null;
                //console.log(JSON.stringify(product));
                send(product, 'meowpinky');
            })();
        });
    } else if (window.location.href.indexOf("/product-tag/") > -1) {
        console.log("get product link");
        const xxclass = $('.return-to-shop');
        console.log(xxclass.length);
        if (xxclass.length == 0){
            console.log("còn trang");
            
        }else{
            console.log("hết trang");
            Return;
        }

        // page = $(".page-numbers .current")[0].textContent;
        // console.log(page);

        $(window).ready(function() {

            $(".image-fade_in_back").each(function(key, item) {

                setTimeout(function() {
                    console.log(key);
                    get_shirt99(key, item);

                    if (key == $(".image-fade_in_back").length - 1) {
                        setTimeout(function() {
                            page = $(".page-numbers .current")[0].textContent;
                            console.log(page);
                            if(page == '1'){
                                var url_string = window.location.href;
                                var url = url_string + '/page/2';
                                window.location.href = url;
                            }else{
                                next_page = parseInt(page) + 1;
                                var url_string = window.location.href;
                                var url = url_string.replace('/page/' + page, '/page/' + next_page);
                                window.location.href = url;
                            }
                            
                        }, 10000);
                    }

                }, 8000 * key);

                function get_shirt99(key, item) {
                    url = $(item).find('a').attr('href');
                    window.open(url, '_blank');
                }

            });

        });
    }
}




function timeout(ms = 10000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}