
function domobj(){
  var self        =this;
  self.products   = [];

  self.getproducts = function(url,callbackhtml,callbackdom){
    $('.loader').show(); //showing loader before products are fetched
    $.getJSON(url, function(response){
        for(i=0; i<response.sales.length ; i++){
          self.products.push( new productobj(response.sales[i], i)  );
        }        
        callbackhtml(callbackdom);
    });
  }
    
  self.updateproducthtml = function(callbackdom){
    $.get('product-template.html', function(template){
    for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml(template);
    }   
    callbackdom(); 
    });
  }
  
  self.updatedom = function(){
    var i=0
    thishtml='';
    for( i=0; i< self.products.length ; i++){
     // if (i % 3 == 0 ){  thishtml += "<div class='row'>";  }
      thishtml += self.products[i].htmlview;
     // if ((i % 3 == 2) || i == (self.products.length-1) ){thishtml += "</div>";}
    }
    $("#content").append(thishtml)
    $('.loader').hide();//hiding loader after products are fetched

    //remove product when close button clicked
    $('.close-btn').on('click',function(){
      var thisEl=$(this).parents('.product-container');
      thisEl.animate({"max-width": "0%"}, 300,"linear", function() {            
          $(this).remove();      
      });
      
    })
  }  
  
}

function productobj(product, i){
  var self          = this;
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.url          = product.url
  self.htmlview     = ""
  self.index        = i
  //self.custom_class = "col"+ ((i % 3) +1)  
  self.product_description  = product.description
  
  self.updatehtml= function(template){    
      self.htmlview = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{prod-desc}',self.product_description); 
  }
}


var page=new domobj();
page.getproducts('data.json',page.updateproducthtml,page.updatedom);
//setTimeout("console.log('building html');page.updateproducthtml();",2000);
//setTimeout("page.updatedom()",5000)
