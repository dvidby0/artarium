var currentimg=1;

function raise(i)
{
	$('#gal-img'+i).css('box-shadow', '0px 5px 15px 2px #777');
	$('#gallery-main-caption').html(captions[i]); /*when opacity transitions to 0, change caption */
	$('#gallery-main-caption').css('opacity',1);
}

function lower(i)
{
	$('#gal-img'+i).css('box-shadow', '0px 0px 10px #888');
	if (currentmode=='gallery-grid')
	$('#gallery-main-caption').css('opacity',0);
}

function changegallerymode(tomode,imgnum)
{
	if (currentmode=='gallery-grid')
	{
		$('#grid-css').remove();
	}
	else if (currentmode=='gallery-lightbox')
	{
		if (tomode=='gallery-lightbox')
		{
			if (!$('#lightbox-dark-css').length)
				$('head').append('<link rel="stylesheet" type="text/css" id="lightbox-dark-css" href="lightbox-dark.css">');
			else
				$('#lightbox-dark-css').remove();
		}
		else
		{
			$('#lightbox-css').remove();
			$('#lightbox-dark-css').remove();
			$('#gallery-lightbox-button-img').attr('src','img/gallery-lightbox.png');
			$('#gallery-lightbox-button').attr('title','Lightbox');
		}
	}
	if (tomode=='gallery-grid')
	{
		$('#single-css').remove();
		if (!$('#grid-css').length)
			$('head').append('<link rel="stylesheet" type="text/css" id="grid-css" href="gallery-grid.css">');
		$('#gallery-main-caption').css('opacity',0);
	
	}
	else if (tomode=='gallery-single')
	{
		if (!$('#single-css').length)
			$('head').append('<link rel="stylesheet" type="text/css" id="single-css" href="gallery-single.css">');
		if (!imgnum)
			imgnum=currentimg;
		else
			currentimg=imgnum;	//changing the global variable currentimg of the page that called this script
		$('.photo').attr('src',"galleries/"+gallerykey+"/"+img_filenames[imgnum-1]+".jpg");
		$('.photo').attr('alt',captions[imgnum-1]);
		$('#gallery-main-caption').html(captions[imgnum-1]);
		$('#cart-link').attr('href',buylinks[imgnum-1]);
		$('#navigation-count').html((imgnum)+' <span class="of">of</span> '+(imax));
	}
	else if (tomode=='gallery-lightbox')
	{
		if (!$('#lightbox-css').length)
		{
			$('.photo').css('opacity',0);
			$('.loading').css('opacity',0);
			if (currentmode=='gallery-grid')
			{
				$('<link/>', {rel: 'stylesheet', id: 'lightbox-css', href: 'gallery-lightbox.css'}).appendTo('head');
			}
			else if (currentmode=='gallery-single')
			{
			//setTimeout("$('head').append(<link rel='stylesheet' type='text/css' id='lightbox-css' href='gallery-lightbox.css'>)",5000);
			setTimeout("$('<link/>', {rel: 'stylesheet', id: 'lightbox-css', href: 'gallery-lightbox.css'}).appendTo('head')",400);
			}
			setTimeout("$('.photo').css('opacity',1)",1000);
			setTimeout("$('.loading').css('opacity',1)",1500);
			$('#gallery-lightbox-button-img').attr('src','img/gallery-lightbox-toggle.png');
			$('#gallery-lightbox-button').attr('title','Toggle lightbox colour');
		}
	}
	$('#'+currentmode+'-button').css('opacity',0.5);
	$('#'+tomode+'-button').css('opacity',1);
	currentmode=tomode;
}

function keyNavigate(e)
{
	if(e.which==39)
		pre_next();
	else if (e.which==37)
		pre_previous();
}
