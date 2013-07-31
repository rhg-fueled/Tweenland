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

filename = "tweens600.txt";
filename_small = "smallTweens.txt";
var _geneticData = loadFileIntoArray(filename);
var _relationshipMap = new Array();
var _count = 0 ;
var _upperLimit = 147;
var _lowerLimit =91;
var _sum = 0;
var _visited = new Array();
var _freq = new Array();
var _leaf = new Array();
var _leafCount = 0 ;
var _genLength  = _geneticData.length;
var _genLengthFreq = _genLength;
var _parentIndex = new Array();
var _freqSum = 0;
var _currentParent = 0;
var _true = 2;

function calculateDiff()
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

	document.write("</br>Genetic bit difference between : " + _upperLimit + " & " + _lowerLimit + "</br>");
	
	for (var i=0; i<600; i++)
	{
		_visited[i] = 0 ;
		_freq[i] = 0 ;
	}
		
	 _leafCount = calculateDiff (_geneticData, _lowerLimit, _upperLimit, _freq, _leafCount, _leaf, _visited);
	 document.write("_leafCount: " + _leafCount);
	
	//initMap(_leafCount, _map, _leaf);
	
	//findParent (_leafCount, _geneticData, _map, _lowerLimit, _upperLimit, _thisCount );
	
	//displayMap (_leafCount, _map);	
	
}

function toCreateSmallerTweens(_geneticData)
{

	var _smallTweens =  new Array();
	var _items = new Array();
	_items = [0,4,58,208,211,369,447,514];

	for (var i=0; i<_items.length; i++)
	{
		_smallTweens[i] = _geneticData[_items[i]];
	}

	for (var i=0; i<_items.length; i++)
	{
		document.write( " _smallTweens [ " + _items[i] + " ] : " + _smallTweens[i] ); 
	}

}



/////////////////////////////////////////////////////////////////////////////
///////--------------------------Differenct Attempt--------------------//////
/////////////////////////////////////////////////////////////////////////////



function initFunctions(){
	for(var i=0; i<_genLength; i++){
	 	_freq[i] = 0 ;
	 	_parentIndex[i]= 0;
	}
}

function freqSum(){
	_freqSum = 0 ;
	for(var i=0; i<_genLength; i++)
		_freqSum += _relationshipMap[i][_genLengthFreq];
}

	
function initRelatationMap(){
	
	for (var i=0; i< _genLength; i++){
		_relationshipMap[i] = [];

		for(var j=0; j< _genLength+2; j++){
			_relationshipMap[i][j] = 0 ;
		}
	}
}


function displayRelationshipMap(){
	for(var i=0; i<_genLength; i++){
		for(var j=0; j<_genLength+2; j++){
		   document.write( _relationshipMap[i][j] );
		}
	document.write( "</br>" );
	}
}

function fillMapWithDiff()
{
	for (var i=0; i<_genLength; i++){
		for (var j=0; j<_genLength; j++){
			var _diff = compareArrays( _geneticData[i], _geneticData[j] ).length;

			if( _diff >= _lowerLimit   &&  _diff <= _upperLimit ){
					
					_relationshipMap[i][j] = _diff;
					++(_relationshipMap[i][_genLengthFreq]);
					++_freq[i];
					_currentParent = j;
				} 
		}
		
		if(_freq[i] == 1)
			_parentIndex[i] = _currentParent; 	
	}
}

function refreshParentIndex(){
	initFunctions();
	for(var i=0; i<_genLength; i++){
		if(_relationshipMap[i][_genLengthFreq] == 1){
			for(var j=0; j<_genLength; j++){
				if(_relationshipMap[i][j] != 0)
						_parentIndex[i] = j;
			}
		}
		else
			_parentIndex[i] = 0;	
	}
}

function somethingHappens(){
	document.write("</br></br>");
	freqSum();
	document.write("</br>" +  "_freqSum: " + _freqSum + "</br>");
	displayFreq();

	while(_freqSum > 2 ){
				for (var i=0; i<_genLength; i++){

					if(_relationshipMap[i][_genLengthFreq] == 1){
						_relationshipMap[i][_parentIndex[i]] = 1 ;
						_relationshipMap[i][_genLengthFreq] = 0;
					}
				}
				
				for(var i=0; i<_genLength; i++){

					if(_parentIndex[i] != 0 ){
						_relationshipMap[_parentIndex[i]][i] = 0;
						--(_relationshipMap[_parentIndex[i]][_genLengthFreq]);
					}
				}
				
				freqSum();
				document.write("</br>" +  "_freqSum: " + _freqSum + "</br>");
				displayFreq();
				--_true ; 
				refreshParentIndex();
			}
}

function displayFreq(){
	for(var i=0; i<_genLength; i++){
		document.write(_relationshipMap[i][_genLengthFreq] + " , ");
		//document.write(_relationshipMap[i][_genLengthFreq] + " ( " + i + " ) " +  " , ");
	}
	document.write("</br></br>");
}

function displaySuperParent() {
	 for(var i=0; i<_genLength; i++){
	 	if(_relationshipMap[i][_genLengthFreq] != 0)
	 		document.write("</br></br> SuperParent: " + i + " ( " + _relationshipMap[i][_genLengthFreq] + ")" );
	 }	
}

function main()
{

	 initFunctions();		
	 
	 initRelatationMap();
	 
	 fillMapWithDiff();
	 
	 somethingHappens();
	 
	 displaySuperParent();

	 return 0;
}

main();












