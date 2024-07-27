
    const animationContainer = document.getElementById('error_page');
    const animationData = '../resourses/error.json'; // Path to your downloaded JSON file
    const anim = bodymovin.loadAnimation({
        container: animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationData,
    });
