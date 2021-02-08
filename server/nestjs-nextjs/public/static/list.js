$(function() 
  {
    $('#table').bootstrapTable()
  }
  )
  
//Moment.JS Return Date Ranges
function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}
 
  
  $('#ok').click( function() 
  { 

    var $table = $('#table')
    var from=$("input[type=date][name=date1]" ).val();
    var to=$("input[type=date][name=date2]" ).val();
    $table.bootstrapTable('filterBy',{ ETA: getDates(from,to)}) 
		
    
 
})

