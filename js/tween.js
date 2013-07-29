// returns a copy of array source
function copyArray(source) {
	var copy = new Array();
	var len = source.length;
	for (var i = 0; i < len; i++) {
		copy[copy.length] = source[i];
	}
	return copy;
}

// returns an array populated with integers 1..n
function integerArray(n) {
	var arr = new Array();
	for (var i=0; i < n; i++) {
		arr[arr.length] = i;
	}
	return arr;
}

// clears the browser page
// note: will fail if page contains no data
function clearPage() {
	document.getElementsByTagName("body")[0].innerHTML = "";
}

// returns a 0 indexed array with one element for every line of data in filepath
function loadFileIntoArray(filepath) {
	if (window.XMLHttpRequest)
	{
		var xhttp = new XMLHttpRequest();
	}
	else // Internet Explorer 5/6
	{
		var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",filepath,false);
	xhttp.send("null");
	var data = xhttp.responseText;
	
	var re = new RegExp("^.*$", "mg");
		
	var dataArray = data.match(re);

	return dataArray;
}

// prints an array to the webpage - omits any undefined or null elements 
function writeArray(source) {
	for (var i=0; i < source.length; i++) {
		if (source[i] != undefined && source[i] != null) {
			document.write(i + ": " + source[i] + "<br />");
		}
	}
	
}

// returns an array containing the indices of elements in source and target that differ
// and optionally writes the output to the page
// assumes source.length == target.length
function compareArrays(source, target, print) {
	var diff = new Array();
	
	for (var i=0; i < source.length; i++) {
		if (source[i] != target[i]) {
			diff[diff.length] = i;
		}
	}
	
	if (print) {
		var diffPrint = new Array();
		for (var i=0; i < diff.length; i++) {
			diffPrint[diff[i]] = [source[diff[i]], target[diff[i]]];
		}
		writeArray(diffPrint);
	}
	
	return diff; 
	
}

/////////////////////////////////////////////////////////////////////////////
///////------------------------------MY CODE---------------------------//////
/////////////////////////////////////////////////////////////////////////////

function calculateDiff(_geneticData)
{
	for(var i=0; i<600; i++)
	{
		var _diff = compareArrays(_geneticData[0], _geneticData[i]);
		document.write( "( 0,  " + i + " )" + " : " + _diff.length + "</br>");
	}
}

function minmax(_geneticData)
{
	 var max = 0 ; 
	 var min = 1000 ;
		
		for (var i=0; i<600; i++)
		 {
			for (var j=i+1; j<600; j++)
			{
				
				if( max < ( compareArrays(_geneticData[i], _geneticData[j]) ).length)
					{
						max = compareArrays(_geneticData[i], _geneticData[j]).length;
						//document.write(max);
					}

				if (min > (compareArrays( _geneticData[i], _geneticData[j]) ).length)
					{
						min = compareArrays( _geneticData[i], _geneticData[j] ).length;
						//document.write(min);
					}
			}
		 } 
		
		document.write("max: " + max + " , " + " min: " + min);
}

function relationship(_geneticData)
{
	var _count = 0 ;
	var _upperLimit = 150;
	var _lowerLimit = 90;
	var _sum = 0;

	document.write("</br>Genetic bit difference between : " + _upperLimit + " & " + _lowerLimit + "</br>");
	
	for (var i=0; i<600; i++)
	{
		for (var j=i; j<600; j++)
		{
			var _diff = compareArrays( _geneticData[i], _geneticData[j] ).length;

			if( _diff >= _lowerLimit  &&  _diff <= _upperLimit )
				{
					document.write(i + " --> " + j + "   :   " + _diff + " (-) </br>");
					_count++;
					_sum += _diff;
				} 
		}
		
		if (_count != 0)  //  so that it doesn't display NaN
		{
			var _avg = _sum/_count;
			document.write("Average : " + _avg + "</br>" + "</br >");
		}	
		_count = 0;
		_sum = 0;

	}

}

function main()
{

	filename = "tweens600.txt";
	var _geneticData = loadFileIntoArray(filename);
	
	relationship (_geneticData);

	return 0;
}

main();
































