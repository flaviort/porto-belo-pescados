<section id='fs-menu'>
    <div class='container'>
        <div class='blue-box white'>

            <div class='top'>

                <a href='./' class='logo magnetic' data-strength='30'>
                    <?php echo file_get_contents('assets/svg/icon.svg'); ?>
                </a>

                <button class='close-fs magnetic' data-strength='30'>
                    <?php echo file_get_contents('assets/svg/ux/close.svg'); ?>
                </button>

            </div>

            <ul class='menu text-big'>

                <li>
                    <a href='./'>
                        Home
                    </a>
                </li>

                <li>
                    <a href='<?php echo($sobre); ?>'>
                        Sobre
                    </a>
                </li>

                <li>
                    <a href='<?php echo($diagnostico); ?>'>
                        Diagnóstico
                    </a>
                </li>

                <li>
                    <a href='<?php echo($consultoria); ?>' target='_blank'>
                        Consultoria
                    </a>
                </li>

                <li>
                    <a href='<?php echo($podcast); ?>'>
                        Podcast
                    </a>
                </li>

                <li>
                    <a href='<?php echo($blog); ?>'>
                        Blog
                    </a>
                </li>

                <li>
                    <a href='<?php echo($whatsapp); ?>'>
                        Fale Conosco
                    </a>
                </li>

            </ul>

            <div class='bottom text-small'>

                <ul class='social'>

                    <li>
                        <a href='<?php echo($linkedin); ?>' target='_blank' rel='noopener' class='hover-underline'>
                            Linkedin
                        </a>
                    </li>

                    <li>
                        <a href='<?php echo($youtube); ?>' target='_blank' rel='noopener' class='hover-underline'>
                            Youtube
                        </a>
                    </li>

                    <li>
                        <a href='<?php echo($instagram); ?>' target='_blank' rel='noopener' class='hover-underline'>
                            Instagram
                        </a>
                    </li>

                </ul>

                <p>
                    Weagle® Governance <?php echo date('Y'); ?>
                </p>

            </div>

        </div>
    </div>
</section>

<div class='blur-fs-bg'></div>