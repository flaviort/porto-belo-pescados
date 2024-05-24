<?php

    // graphql query
	$query = <<<'GRAPHQL'
		query Podcasts {
			podcasts {
				nodes {
					title
					featuredImage {
						node {
							mediaItemUrl
						}
					}
					weaglecast {
						youtubeLink
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
	} elseif (!isset($data['data']['podcasts']['nodes'])) {
		echo 'Nenhum podcast encontrado.';
	} else {
		$posts = $data['data']['podcasts']['nodes'];
		// now $posts contains the podcast data fetched from wp
		// proceed to render the content as before
	}

	// close curl session
	curl_close($curl);
?>

<section id='weagle-cast' class='section-padding-top' data-scroll-section>
    <div class='container'>
        
        <div class='flex'>

            <h3 class='text-big reveal-text'>
                Weagle Cast
            </h3>

            <a href='<?php echo($podcast); ?>' class='hover-underline'>
                Ver todos
            </a>

        </div>

        <div class='weagle-cast-slider animated-slider swiper-container'>
            <div class='swiper-wrapper'>

                <?php
                    foreach ($posts as $index => $item):
                        if ($index >= 4) break;
                ?>
                    <div class='swiper-slide'>
                        <a href='<?= $item['weaglecast']['youtubeLink'] ?>' target='_blank' rel='noopener' class='weagle-cast-item'>
                            <div class='image'>
                            
                                <div class='youtube-icon'>
                                    <?php echo file_get_contents('assets/svg/social/youtube.svg'); ?>
                                </div>

                                <img src="<?= $item['featuredImage']['node']['mediaItemUrl'] ?>" alt="<?= $item['title'] ?>" width='1280' height='720' loading='lazy'>

                            </div>
                        </a>
                    </div>
                <?php endforeach; ?>

            </div>
        </div>

    </div>
</section>