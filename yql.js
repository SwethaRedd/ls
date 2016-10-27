var zipCode= '20770';
var urlMap ={};
urlMap["Parks"]= "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D%27"+zipCode+"%27%20and%20query%3D%27Parks%27&format=json&callback=";
urlMap["Schools"]="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D%27"+zipCode+"%27%20and%20query%3D%27Schools%27&format=json&callback=";
urlMap["Restaurents"]="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D%27"+zipCode+"%27%20and%20query%3D%27Restaurents%27&format=json&callback=";
urlMap["Apartments"]="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D%27"+zipCode+"%27%20and%20query%3D%27Apartments%27&format=json&callback=";
urlMap["Transit"]="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20local.search%20where%20zip%3D%27"+zipCode+"%27%20and%20query%3D%27Transit%27&format=json&callback=";

$(document).ready(function(){

	getItemsData();

	$(document).on('dblclick', '.makeEditable', function(){
		var textDiv =$(this); 
		var textox = textDiv.next().removeClass('hide');
		textDiv.addClass('hide');
	});

	$(document).on('click', '.save', function(){
		var button =$(this); 
		var updatedTextVal= $(this).closest('.panel-body').find('input.form-control').val();
		button.parent().closest('div').removeAttr('class').attr('class','input-group hide');
		button.closest('.panel-body').find('.makeEditable').removeClass('hide');
		button.closest('.panel-body').find('.makeEditable').html(updatedTextVal);

		updteItems(updatedTextVal, button.data("item-type"), button.data("item-id"));
	});

	$("#reset").on('click', function(){

		resetItems();

	});

	var panelList = $('.panel');
    panelList.draggable({
    	handle : ".panel-heading"
    });
});

function getItemsData()
{
	console.log("getItemsData");
	$.each(urlMap, function(key,value)
	{
		retrieveItems(key,value);
	});
}

function checkItems(results, key)
{
	console.log("checkItems");
	var len = results.rows.length;
	if (len > 0) 
	{
		console.log("checkItems "+key);
		displayData(results,key);
		return true;
	}

	return false;
}
 function callService(key,value)
 {
 	$.getJSON(value, function (data) 
	{
		var results = data.query.results.Result;
		insertItems(results,key,value);
		
	});
 }

function displayData(results,item)
{
	console.log("displayData");
	var html = " ";
	var accordionDiv = '<div class="panel-group" id="accordion'+item+'">';
	var accordionDivClose = '</div>';

	$.each(results.rows, function(index){

		var collapseBody = 'collapse'+results.rows[index].uId;
				html+= '<div class="panel panel-default">'+
						 '<div class="panel-heading">'+
						   '<h4 class="panel-title">'+
							  '<a data-toggle="collapse" data-parent="accordion'+item+'" href="#'+collapseBody+'">'+results.rows[index].Title+'</a>'+
							'</h4>'+
						  '</div>'+
						  '<div id="'+collapseBody+'" class="panel-collapse collapse">'+
							'<div class="panel-body"><div class="makeEditable">'+results.rows[index].Address+
							'</div>'+
							'<div class="input-group hide">'+
							   '<input type="text" class="form-control" value="'+results.rows[index].Address+'">'+
							   '<span class="input-group-btn">'+
									'<button class="btn btn-default btn-primary btn-sm save"'+ 
											'type="button" data-item-id ="'+results.rows[index].uId+'"'+
											'data-item-type="'+results.rows[index].Type_Code+'">Save</button>'+
							   '</span>'+
							'</div>'+
						   '</div>'+
						  '</div>'+
						'</div>';

	});
	$('#'+item).html(accordionDiv+html+accordionDivClose);
}


function resetItems()
{
	deleteItems();
}
