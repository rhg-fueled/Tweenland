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

function calculateDiff(_geneticData, _lowerLimit, _upperLimit, _freq, _leafCount, _leaf, _visited)
{
	for (var i=0; i<600; i++)
	{
		for (var j=0; j<600; j++)
		{
			var _diff = compareArrays( _geneticData[i], _geneticData[j] ).length;

			if( _diff >= _lowerLimit   &&  _diff <= _upperLimit )
				{
					document.write(i + " --> " + j + "   :   " + _diff + " (-) </br>");
					_freq[i]++;  
					_visited[i] = _visited [j] = 1 ;
					
				} 
		}
		
		if (_freq[i] == 1)
		{
			_leaf[_leafCount++] = i ;	
		}
	}
	return _leafCount;
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


function initMap(_leafCount, _map, _leaf)
{

	for (var i=0; i<_leafCount; i++)
	 	_map[i] =  new Array(10);

	for (var i=0; i<_leafCount; i++)
	 	_map[i][0] =  _leaf[i];


	 for (var i=0; i<_leafCount; i++)
		for (var j=1; j<10; j++)
				_map[i][j] = 0 ;
	 
	// document.write("Inside initMap");
}



function findParent( _leafCount, _geneticData, _map, _lowerLimit, _upperLimit, _thisCount )
{
	for (var i=0 ; i<_leafCount; i++)
	{
		for (var j=0; j<600; j++)
		{
				var _diff = compareArrays( _geneticData[ _map[i][0] ], _geneticData[j] ).length;
			    if( _diff >= _lowerLimit  &&  _diff <= _upperLimit && _map[i][0] != j )
					{
						_thisCount++;
						_map[i][_thisCount] = j ;	
					}
		}
		_thisCount = 0 ;
	}

	//document.write("Inside findParent");
}


function displayMap(_leafCount, _map)
{
	
	for (var i=0; i<_leafCount; i++)
	 {
	 	
	 	for (var j=0; j<10; j++)
	 	{
	 		document.write(_map[i][j] + " : ");
	 	}
	 	document.write("</br>");
	 }
	//document.write("Inside displayMap");

	for (var i=0 ; i<_leafCount; i++)
	{
		for (var j=0; j<_leafCount; j++)
		{
			if(i!=j)
			{	
				if(_map[i][1] == _map[j][1])
				{
					document.write(_map[i][0] + " : " + _map[j][0] + " ( " + _map[i][1] + " ) " + " , ");
				}
			}
		}
		document.write("</br>---Next----</br>");
		_thisCount = 0 ;
	}
}



function relationship(_geneticData)
{
	var _count = 0 ;
	var _upperLimit = 147;
	var _lowerLimit =91;
	var _sum = 0;
	var _visited = new Array();
	var _freq = new Array();
	var _leaf = new Array();
	var _leafCount = 0 ;
	var _map = new Array();
	var _thisCount = 0;

	document.write("</br>Genetic bit difference between : " + _upperLimit + " & " + _lowerLimit + "</br>");
	
	for (var i=0; i<600; i++)
	{
		_visited[i] = 0 ;
		_freq[i] = 0 ;
	}
		
	 _leafCount = calculateDiff (_geneticData, _lowerLimit, _upperLimit, _freq, _leafCount, _leaf, _visited);
	
	initMap(_leafCount, _map, _leaf);
	
	findParent (_leafCount, _geneticData, _map, _lowerLimit, _upperLimit, _thisCount );
	
	displayMap (_leafCount, _map);	
	
}


function main()
{

	filename = "tweens600.txt";
	var _geneticData = loadFileIntoArray(filename);
	
	relationship (_geneticData);

	return 0;
}

main();














	//---to check if all the tweens have been visited !

	// for (var i=0; i<600; i++)
	// {
	// 	document.write(_visited[i]);
	// 	if( !(_visited[i]) )
	// 		document.write("</br>");
	// }

	 // for (var i=0; i<_leafCount; i++)
	 // 	document.write( _leaf[i] + " , " );




















