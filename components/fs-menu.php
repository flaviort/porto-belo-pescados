<section id='fs-menu'>
    <div class='container'>
        <div class='blue-box white'>

            <div class='top'>

                <a href='#banner' class='logo magnetic' data-strength='30' sliding-link>
                    <?= file_get_contents('assets/svg/logo/icon.svg'); ?>
                </a>

                <button class='close-fs magnetic' data-strength='30'>
                    <?= file_get_contents('assets/svg/ux/close.svg'); ?>
                </button>

            </div>

            <ul class='menu text-big'>
                <?php
                    $menu = [
                        [
                            'name' => 'Home',
                            'link' => '#banner'
                        ],
                        [
                            'name' => 'Quem Somos',
                            'link' => '#quem-somos'
                        ],
                        [
                            'name' => 'Produtos',
                            'link' => '#produtos'
                        ],
                        [
                            'name' => 'Contato',
                            'link' => '#contato'
                        ]
                    ];
                ?>

                <?php foreach ($menu as $item): ?>
                    <li>
                        <a href='<?= ($item['link']); ?>' class='sliding-link'>
                            <?= ($item['name']); ?>
                        </a>
                    </li>
                <?php endforeach; ?>

            </ul>

        </div>
    </div>
</section>

<div class='blur-fs-bg'></div>