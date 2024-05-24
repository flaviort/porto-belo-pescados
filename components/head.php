<?php include('components/globals.php') ?>

<!DOCTYPE html>
	<html lang='pt-BR'>

		<head>

			<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
			<meta name='format-detection' content='telephone=no'>
			<link rel='shortcut icon' href='favicon.png'>

			<meta name='author' content='<?php echo($site_title); ?>'>

			<title><?php echo $site_title . ' ' . (isset($post_title) ? htmlspecialchars($post_title) : htmlspecialchars($page)); ?></title>

			<!-- google -->
			<meta name='description' content='<?php echo($site_desc); ?>' />
			<link rel='canonical' href='<?php echo($site_url); ?>' />
				
			<!-- facebook -->
			<meta property='og:locale' content='pt_BR' />
			<meta property='og:type' content='website' />
			<meta property='og:title' content='<?php echo($site_title); ?>' />
			<meta property='og:description' content='<?php echo($site_desc); ?>' />
			<meta property='og:url' content='<?php echo($site_url); ?>/' />
			<meta property='og:site_name' content='<?php echo($site_title); ?>' />
			<meta property='og:image' content='<?php echo($site_url); ?>/assets/img/og-image.jpg' />
			<meta property='og:image:secure_url' content='<?php echo($site_url); ?>/assets/img/og-image.jpg' />
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='630' />

			<!-- css -->
			<link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css' />
			<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css' />
			<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css' />
			<link rel='stylesheet' type='text/css' href='assets/css/vendor/bootstrap-grid.css'>
			<link rel='stylesheet' type='text/css' href='assets/css/main.min.css'>
			
		</head>

		<body>

			<header>
				<?php include('components/opening.php');?>
				<?php include('components/fs-menu.php');?>
				<div id='mouse'></div>
			</header>

			<main id='main-content' class='<?php echo($current_page); ?>'>
				<div class='main-wrap' data-scroll-container>

					<?php include('components/top-menu.php');?>