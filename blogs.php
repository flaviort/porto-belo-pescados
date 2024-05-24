<?php
	$currentPage = 'blogs full-white-menu';
	$nameSpace = 'blogs';
	$pageTitle = 'Blogs';
	include('components/head.php');

	// set local time / language to brasil
	setlocale(LC_TIME, 'pt_BR', 'pt_BR.utf-8', 'portuguese');

	// graphql query
	$query = <<<'GRAPHQL'
		query Posts {
			posts(first: 100) {
				nodes {
					date
					title
					link
					slug
					id
					featuredImage {
						node {
							mediaItemUrl
						}
					}
				}
			}
		}
	GRAPHQL;

	// graphql endpoint url
	$graphql_endpoint = 'https://weagle.com.br/lp/graphql';

	// curl request
	$curl = curl_init($graphql_endpoint);
	curl_setopt_array($curl, [
		CURLOPT_POST           => true,
		CURLOPT_POSTFIELDS     => json_encode(['query' => $query]),
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_HTTPHEADER     => ['Content-Type: application/json']
	]);

	// execute curl request and decode json response
	$response = curl_exec($curl);
	$data = json_decode($response, true);

	// check for errors and data presence
	if (curl_errno($curl)) {
		echo 'Error: ' . curl_error($curl);
	} elseif (!isset($data['data']['posts']['nodes'])) {
		echo 'Nenhum post encontrado.';
	} else {
		$posts = $data['data']['posts']['nodes'];
		// now $posts contains the podcast data fetched from wp
		// proceed to render the content as before
	}

	// close curl session
	curl_close($curl);
?>

<section id='banner' class='z5' data-scroll-section>
	<div class='container transitionUp white'>

		<div class='left'>

			<h1 class='text-biggest bold'>
				Weagle Blog
			</h1>
		
			<p class='text'>
				Vamos te ajudar a construir, organizar e vender o seu negócio. Todo negócio terá apenas 3 destinos: Sucessão, venda ou falência.
			</p>

		</div>

		<img data-src='assets/img/books.png' alt='Livros' width='633' height='810' class='lazy'>

	</div>
</section>

<section id='middle' class='section-padding-top-big transitionUp' data-scroll-section>

	<div class='bg'>
		<?php echo file_get_contents('assets/svg/curve-top-right.svg'); ?>
	</div>

	<div class='container z5'>
		<div class='row'>
			
			<?php foreach ($posts as $item) :
				$date = new DateTime($item['date']);
				$formattedDate = strftime('%d de %B de %Y', $date->getTimestamp());
			?>
				<div class='col-md-6'>
					<div class='blog-item'>
						
						<a href='blog/<?= $item['slug'] ?>' class='image'>
							<img data-src='<?= $item['featuredImage']['node']['mediaItemUrl'] ?>' alt='<?= $item['title'] ?>' width='1200' height='700' class='lazy'>
						</a>

						<div class='infos'>

							<a href='blog/<?= $item['slug'] ?>' class='text-medium-big hover-underline'>
								<?= $item['title'] ?>
							</a>

							<p class='date'>
								<?= $formattedDate ?>
							</p>

							<a href='blog/<?= $item['slug'] ?>' class='blue-button-small magnetic' data-strength='30'>
								Leia mais
							</a>

						</div>

					</div>
				</div>
			<?php endforeach; ?>

		</div>

	</div>
</section>

<?php include('components/bottom-text.php'); ?>

<?php include('components/footer.php'); ?>