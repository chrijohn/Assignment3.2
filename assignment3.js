var originalGistList = [];

window.onload = function()
{
	var req = new XMLHttpRequest();
	if (!req)
	{
		throw 'Unable to create HttpRequest.';
	}
	var url = 'https://api.github.com/gists';

	req.onreadystatechange = function()
	{
			if(this.readyState == 4)
			{
//				var numResults = document.getElementsByName('numPages')[0]
//				var gist = JSON.parse(this.responseText)
//				var gisturl = gist.list[0].url;
//				var description = gist.list[0].description;
			}
	};
	req.open('GET', url);
	req.send();
}
