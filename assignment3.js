var originalGistList = [];
var gistlist = [];
var favoriteGists = [];

function getGists()
{
	var req = new XMLHttpRequest();
	if (!req)
	{
		throw 'Unable to create HttpRequest.';
	}
	var url = 'https://api.github.com/gists';

	req.onreadystatechange = function()
	{
			if(this.readyState == 4 && this.status==200)
			{
				var originalGistList = JSON.parse(this.responseText);
				for (i=0; i < originalGistList.length; i++)
				{
						var id = originalGistList[i].id;
						var description = originalGistList[i].description;
						var url = originalGistList[i].url;
						var newgist = {id: id, description: description, url:url};
						gistlist[gistlist.length] = newgist;
						
				}

				var gists = document.getElementById("gists");
				var table = document.createElement("table");
				var tbleBody = document.createElement("tbody");
				
				var row = document.createElement("tr");
				var cell = document.createElement("td");
				var cellText = document.createTextNode("Favorite");
				cell.appendChild(cellText);
				row.appendChild(cell);
				var cell = document.createElement("td");
				var cellText = document.createTextNode("Description");
				cell.appendChild(cellText);
				row.appendChild(cell);
				var cell = document.createElement("td");
				var cellText = document.createTextNode("URL");
				cell.appendChild(cellText);
				row.appendChild(cell);
				tbleBody.appendChild(row);
				for (var i=0; i < gistlist.length; i++)
				{
					var isFav = favCheck(gistlist[i].id);
					if (isFav == 0){
					var row = document.createElement("tr");
						
					for (var j = 0; j < 3; j++)
					{
						var cell = document.createElement("td");
						if (j==0)
						{
							var btn = document.createElement("BUTTON");
							var t = document.createTextNode("Add Favorite");
							btn.appendChild(t);
							btn.setAttribute("gistID", gistlist[i].id);
							btn.onclick = function()
							{
								var gistID = this.getAttribute("gistID");	
								function favoriteGist(ID)
								{
									var gistIndex = findgistbyid(gistID)
									var favGist = gistlist[gistIndex];
									favoriteGists[favoriteGists.length] = favGist;
									localStorage.setItem('userSettings', JSON.stringify(favoriteGists));
								}	
								favoriteGist(gistID);
								displayFavorites();
							}
								cell.appendChild(btn);
								row.appendChild(cell);
						}
						if (j==1)
						{
							var cellText = document.createTextNode(gistlist[i].description);
							cell.appendChild(cellText);
							row.appendChild(cell);
						}
						if (j==2)
						{
							cell.innerHTML = '<a href=\"' + gistlist[i].url + '\">' + gistlist[i].url + '</a>';
							row.appendChild(cell);
						}
					}
				tbleBody.appendChild(row);
				}
				}
				table.appendChild(tbleBody);
				gists.appendChild(table);
				table.setAttribute("border", "2");
			}
	};
	req.open('GET', url, true);
	req.send();
}

function findgistbyid(gistID)
{
	for (i = 0; i < gistlist.length; i++)
	{
		if (gistID == gistlist[i].id)
		{
			return i;
		}
	}
}
function findfavbyid (gistID)
{
	for (i = 0; i < favoriteGists.length; i++)
	{
		if (gistID == favoriteGists[i].id)
		{
			return i;
		}
	}
}
function displayFavorites()
{
	var gists = document.getElementById("favored-gists");
	
	var table = document.createElement("table");
	table.innerHTML = '<id = "favtable"/>';
	var newtable = document.getElementById("favtable");
	var tbleBody = document.createElement("tbody");
	tbleBody.innerHTML = '<id = "favbody"/>';
				
	for (var i=0; i < favoriteGists.length; i++)
	{
		var row = document.createElement("tr");
						
		for (var j = 0; j < 3; j++)
		{
			var cell = document.createElement("td");
			if (j==0)
			{
				var btn = document.createElement("BUTTON");
				var t = document.createTextNode("Remove Favorite");
				btn.appendChild(t);
				btn.setAttribute("gistID", favoriteGists[i].id);
				btn.onclick = function() 
				{
					var gistID = this.getAttribute("gistID");	
					function removeFavorite(ID)
					{
						var gistIndex = findfavbyid(gistID)
						favoriteGists.splice(gistIndex,1);
						displayFavorites();
//						getGists();
					}	
					removeFavorite(gistID);
				}

				cell.appendChild(btn);
				row.appendChild(cell);
			}
			if (j==1)
			{
				var cellText = document.createTextNode(favoriteGists[i].description);
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			if (j==2)
			{
				cell.innerHTML = '<a href=\"' + favoriteGists[i].url + '\">' + favoriteGists[i].url + '</a>';
				row.appendChild(cell);
			}
		}
		tbleBody.appendChild(row);
	}
	table.appendChild(tbleBody);
	gists.appendChild(table);
	table.setAttribute("border", "2");
	var isTable = 1;
	
//	console.log ("There is a table");
//	var oldtable = document.getElementById("favtable");
//	var oldbody = document.getElementById("favbody");
//	var blankbody = document.createElement("tbody");
//	oldtable.replaceChild(blankbody, oldbody);
//	oldbody.oldtable.removeChild(oldbody);

}
window.onload = function()
{
	var settingStr = localStorage.getItem('userSettings');
	if (settingStr === null)
	{
		settings = {'favoriteGists' : []};
		localStorage.setItem('userSettings', JSON.strinify(favoriteGists));
	}
	else
	{
		favoriteGists = JSON.parse(localStorage.getItem('userSettings'));
	}
	displayFavorites();
}

function favCheck(ID)
{
	for (k = 0; k < favoriteGists.length; k++)
	{
		if (ID == favoriteGists[k].id)
		{
			return 1;
		}
	}
	return 0;
}