// Aisle JavaScript functionality
console.log('Aisle loaded successfully!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is ready');
    initializeAisleApp();
});

function initializeAisleApp() {
    initializeSidebar();
    initializeSearch();
    initializeVoting();
    initializeCategories();
    initializeNavigation();
    console.log('Aisle app initialized');
}

// Sidebar functionality
function initializeSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('aisleSidebar');
    const mainContent = document.getElementById('mainContent') || document.getElementById('aiSearchMain');
    
    // Create overlay for mobile
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    function toggleSidebar() {
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
    
    function openSidebar() {
        sidebar.classList.add('open');
        mainContent.classList.add('sidebar-open');
        overlay.classList.add('open');
    }
    
    function closeSidebar() {
        sidebar.classList.remove('open');
        mainContent.classList.remove('sidebar-open');
        overlay.classList.remove('open');
    }
    
    // Toggle sidebar on menu button click
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleSidebar();
    });
    
    // Close sidebar when clicking overlay
    overlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking outside on desktop
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                closeSidebar();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            overlay.classList.remove('open');
        }
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            // Add search functionality here
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Focus search on Ctrl+K
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Voting functionality
function initializeVoting() {
    const voteButtons = document.querySelectorAll('.vote-button');
    
    voteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isUpvote = this.classList.contains('upvote');
            const isDownvote = this.classList.contains('downvote');
            const voteCount = this.parentElement.querySelector('.vote-count');
            
            if (isUpvote || isDownvote) {
                // Remove existing vote states
                this.parentElement.querySelectorAll('.vote-button').forEach(btn => {
                    btn.classList.remove('voted-up', 'voted-down');
                });
                
                // Add new vote state
                if (isUpvote) {
                    this.classList.add('voted-up');
                } else {
                    this.classList.add('voted-down');
                }
                
                // Update vote count (simplified)
                let currentCount = parseInt(voteCount.textContent.replace(/[^\d]/g, ''));
                if (isUpvote) {
                    currentCount += 1;
                } else {
                    currentCount -= 1;
                }
                voteCount.textContent = currentCount >= 1000 ? (currentCount/1000).toFixed(1) + 'k' : currentCount.toString();
            }
        });
    });
}

// Add some sample posts dynamically
function addSamplePosts() {
    const postFeed = document.querySelector('.post-feed');
    
    const samplePosts = [
        {
            profileName: 'Marcus Thompson',
            profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            postTime: '2h',
            caption: 'Just tried Perplexity AI for the first time and holy shit... this thing is actually useful for research. Way better than ChatGPT for fact-checking. The citations are a game changer 🔥',
            hasImage: false,
            likes: 47,
            comments: 12,
            shares: 8
        },
        {
            profileName: 'Zara Patel',
            profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            postTime: '4h',
            caption: 'DeepSeek Coder is absolutely insane. It just wrote a full React component with proper TypeScript types in like 30 seconds. I\'m starting to feel obsolete as a developer 😅',
            hasImage: true,
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop',
            imageAlt: 'Code on computer screen',
            likes: 89,
            comments: 23,
            shares: 15
        },
        {
            profileName: 'Jake Morrison',
            profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            postTime: '6h',
            caption: 'Character.AI is either the best thing ever or the worst thing ever. I spent 3 hours talking to a fictional AI character about my life problems and now I\'m questioning everything',
            hasImage: false,
            likes: 156,
            comments: 34,
            shares: 22
        },
        {
            profileName: 'Aisha Kumar',
            profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            postTime: '8h',
            caption: 'Claude 3.5 Sonnet just helped me debug my entire codebase in 10 minutes. What took me 2 days to figure out, it solved instantly. I\'m both amazed and terrified',
            hasImage: true,
            imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop',
            imageAlt: 'Debugging code on multiple monitors',
            likes: 72,
            comments: 18,
            shares: 9
        },
        {
            profileName: 'Tyler Chen',
            profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            postTime: '12h',
            caption: 'GPT-4 is getting dumber by the day. It used to be able to write decent code, now it\'s just giving me basic tutorials. What happened?',
            hasImage: false,
            likes: 203,
            comments: 67,
            shares: 31
        },
        {
            profileName: 'Maya Rodriguez',
            profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            postTime: '1d',
            caption: 'Midjourney v6 is absolutely wild. I generated a photo of a cyberpunk cat wearing a business suit and it looks more professional than my LinkedIn headshot',
            hasImage: true,
            imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=300&fit=crop',
            imageAlt: 'AI generated cyberpunk cat in business suit',
            likes: 124,
            comments: 28,
            shares: 19
        },
        {
            profileName: 'Brandon Lee',
            profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
            postTime: '1d',
            caption: 'AI is going to replace us all and honestly? I\'m ready. Let the robots take over, I\'ll just become a professional AI prompt engineer',
            hasImage: false,
            likes: 91,
            comments: 45,
            shares: 12
        },
        {
            profileName: 'Sophie Williams',
            profilePicture: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
            postTime: '2d',
            caption: 'Just used AI to write my entire thesis proposal. My professor is going to be so impressed... or suspicious. There\'s no in-between',
            hasImage: false,
            likes: 67,
            comments: 29,
            shares: 7
        }
    ];
    
    samplePosts.forEach(postData => {
        const post = createPostElement(postData);
        postFeed.appendChild(post);
    });
}

function createPostElement(data) {
    const post = document.createElement('div');
    post.className = 'post';
    
    const imageSection = data.hasImage ? `
        <div class="post-image">
            <img src="${data.imageUrl}" alt="${data.imageAlt || 'Post content'}" />
        </div>
    ` : '';
    
    const profilePicture = data.profilePicture || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTIwIDEwQzE2LjY4NjMgMTAgMTQgMTIuNjg2MyAxNCAxNlMxNi42ODYzIDIyIDIwIDIyUzI2IDE5LjMxMzcgMjYgMTZTMjMuMzEzNyAxMCAyMCAxMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMiAyNkMxMiAyMy43OTA5IDEzLjc5MDkgMjIgMTYgMjJIMjRDMjYuMjA5MSAyMiAyOCAyMy43OTA5IDI4IDI2VjI4SDEyVjI2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
    
    post.innerHTML = `
        <div class="post-header">
            <div class="profile-section">
                <div class="profile-picture">
                    <img src="${profilePicture}" alt="Profile" />
                </div>
                <div class="profile-info">
                    <div class="profile-name">${data.profileName}</div>
                    <div class="post-time">${data.postTime}</div>
                </div>
            </div>
            <button class="more-options">⋯</button>
        </div>
        
        <div class="post-content">
            <div class="post-caption">${data.caption}</div>
            ${imageSection}
        </div>
        
        <div class="post-actions">
            <button class="action-button like-button">
                <span class="action-icon">❤️</span>
                <span class="action-count">${data.likes}</span>
            </button>
            <button class="action-button comment-button">
                <span class="action-icon">💬</span>
                <span class="action-count">${data.comments}</span>
            </button>
            <button class="action-button share-button">
                <span class="action-icon">🔄</span>
                <span class="action-count">${data.shares}</span>
            </button>
        </div>
    `;
    
    // Add click handlers for action buttons
    const likeButton = post.querySelector('.like-button');
    likeButton.addEventListener('click', function() {
        this.classList.toggle('liked');
        const countElement = this.querySelector('.action-count');
        let count = parseInt(countElement.textContent);
        if (this.classList.contains('liked')) {
            count += 1;
        } else {
            count -= 1;
        }
        countElement.textContent = count;
    });
    
    return post;
}

// Categories functionality
function initializeCategories() {
    const categoriesHeader = document.getElementById('categoriesHeader');
    const categoriesList = document.getElementById('categoriesList');
    const expandIcon = document.getElementById('expandIcon');
    
    console.log('Categories elements found:', { categoriesHeader, categoriesList, expandIcon });
    
    if (categoriesHeader && categoriesList && expandIcon) {
        categoriesHeader.addEventListener('click', function() {
            console.log('Categories header clicked');
            const isOpen = categoriesList.classList.contains('open');
            
            if (isOpen) {
                categoriesList.classList.remove('open');
                expandIcon.classList.remove('rotated');
            } else {
                categoriesList.classList.add('open');
                expandIcon.classList.add('rotated');
            }
        });
        
        // Add click handlers for category items
        const categoryItems = document.querySelectorAll('.category-item');
        console.log('Category items found:', categoryItems.length);
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                const categoryName = this.querySelector('.category-name').textContent;
                console.log('Selected category:', categoryName);
                
                // Navigate to specific category pages
                if (categoryName === 'Entertainment') {
                    window.location.href = 'entertainment.html';
                }
                // Add more category navigation here as needed
            });
        });
    } else {
        console.log('Categories elements not found on this page');
    }
}

// Navigation functionality
function initializeNavigation() {
    // Add click handlers for navigation items
    const feedNav = document.querySelector('.nav-item[data-page="feed"]');
    const aiSearchNav = document.querySelector('.nav-item[data-page="ai-search"]');
    const createNav = document.querySelector('.nav-item[data-page="create"]');
    
    console.log('Navigation elements found:', { feedNav, aiSearchNav, createNav });
    
    if (feedNav) {
        feedNav.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Feed navigation clicked');
            window.location.href = 'index.html';
        });
    }
    
    if (aiSearchNav) {
        aiSearchNav.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('AI Search navigation clicked');
            window.location.href = 'ai-search.html';
        });
    }
    
    if (createNav) {
        createNav.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Create page clicked - functionality to be implemented');
        });
    }
}

// Entertainment page toggle functionality
function initializeEntertainmentToggle() {
    const exploreButton = document.getElementById('exploreButton');
    const rankingButton = document.getElementById('rankingButton');
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    
    if (exploreButton && rankingButton && gridView && listView) {
        exploreButton.addEventListener('click', function() {
            // Switch to explore view
            exploreButton.classList.add('active');
            rankingButton.classList.remove('active');
            gridView.style.display = 'grid';
            listView.classList.remove('active');
        });
        
        rankingButton.addEventListener('click', function() {
            // Switch to ranking view
            rankingButton.classList.add('active');
            exploreButton.classList.remove('active');
            gridView.style.display = 'none';
            listView.classList.add('active');
        });
    }
}

// Initialize entertainment toggle if on entertainment page
if (window.location.pathname.includes('entertainment.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeEntertainmentToggle();
    });
}

// Character AI toggle functionality
function initializeCharacterAIToggle() {
    const overviewButton = document.getElementById('overviewButton');
    const reviewsButton = document.getElementById('reviewsButton');
    const overviewContent = document.getElementById('overviewContent');
    const reviewsContent = document.getElementById('reviewsContent');
    
    if (overviewButton && reviewsButton && overviewContent && reviewsContent) {
        overviewButton.addEventListener('click', function() {
            // Switch to overview view
            overviewButton.classList.add('active');
            reviewsButton.classList.remove('active');
            overviewContent.classList.remove('hidden');
            reviewsContent.classList.add('hidden');
        });
        
        reviewsButton.addEventListener('click', function() {
            // Switch to reviews view
            reviewsButton.classList.add('active');
            overviewButton.classList.remove('active');
            reviewsContent.classList.remove('hidden');
            overviewContent.classList.add('hidden');
        });
    }
}

// Initialize character AI toggle if on characterai page
if (window.location.pathname.includes('characterai.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeCharacterAIToggle();
    });
}

// AI Search conversation functionality
function initializeAISearch() {
    const chatboxInput = document.getElementById('chatboxInput');
    const sendButton = document.getElementById('sendButton');
    const chatboxMessages = document.getElementById('chatboxMessages');
    
    if (chatboxInput && sendButton && chatboxMessages) {
        // Send message function
        function sendMessage() {
            const message = chatboxInput.value.trim();
            if (message) {
                addUserMessage(message);
                chatboxInput.value = '';
                
                // Simulate AI thinking time
                setTimeout(() => {
                    const aiResponse = getAIResponse(message);
                    addAIMessage(aiResponse);
                }, 1000 + Math.random() * 1000); // 1-2 second delay
            }
        }
        
        // Event listeners
        sendButton.addEventListener('click', sendMessage);
        chatboxInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Add user message to chat
function addUserMessage(message) {
    const chatboxMessages = document.getElementById('chatboxMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <div class="user-icon-small">👤</div>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatboxMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Add AI message to chat
function addAIMessage(response) {
    const chatboxMessages = document.getElementById('chatboxMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    
    // Add typing animation
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <div class="ai-icon-small">🤖</div>
        </div>
        <div class="message-content">
            <div class="typing-indicator" id="typingIndicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatboxMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Replace typing indicator with typewriter effect
    setTimeout(() => {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typewriterEffect(typingIndicator, response);
        }
    }, 1500);
}

// Typewriter effect function
function typewriterEffect(element, text) {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    
    // Get all text content
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    const htmlContent = tempDiv.innerHTML;
    
    // Clear the element
    element.innerHTML = '';
    element.className = 'message-content';
    
    // Start typewriter effect
    let i = 0;
    const speed = 30; // milliseconds per character
    
    function typeWriter() {
        if (i < textContent.length) {
            // Add character with cursor
            element.innerHTML = textContent.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Remove cursor and add full HTML content
            element.innerHTML = htmlContent;
            scrollToBottom();
        }
    }
    
    typeWriter();
}

// Get AI response based on user input
function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Character.AI suggestion path
    if (message.includes('character') || message.includes('chat') || message.includes('conversation') || 
        message.includes('roleplay') || message.includes('personality') || message.includes('fictional')) {
        return `
            <p>Perfect! For interactive AI character conversations, I highly recommend <strong>Character.AI</strong>. It's one of the most popular and engaging platforms for this type of AI interaction.</p>
            <div class="ai-suggestion-card">
                <div class="suggestion-header">
                    <div class="suggestion-logo">
                        <img src="charai.jpg" alt="Character.AI Logo" style="width: 40px; height: 40px; border-radius: 8px;">
                    </div>
                    <div class="suggestion-info">
                        <h3>Character.AI</h3>
                        <p>#2 in Entertainment • ⭐ 4.8/5</p>
                    </div>
                </div>
                <div class="suggestion-description">
                    <p>Create and chat with AI characters that have unique personalities, backstories, and conversation styles. Perfect for roleplay, creative writing, education, and entertainment.</p>
                </div>
                <div class="suggestion-features">
                    <span class="feature-tag">Character Creation</span>
                    <span class="feature-tag">Roleplay</span>
                    <span class="feature-tag">Creative Writing</span>
                    <span class="feature-tag">Educational</span>
                </div>
                <button class="suggestion-button" onclick="window.location.href='characterai.html'">
                    Explore Character.AI →
                </button>
            </div>
        `;
    }
    
    // Creative/Entertainment path
    if (message.includes('creative') || message.includes('fun') || message.includes('entertainment') || 
        message.includes('storytelling') || message.includes('art') || message.includes('writing')) {
        return `
            <p>That sounds exciting! For creative and entertainment purposes, there are several great options. Are you more interested in:</p>
            <ul style="margin: 8px 0; padding-left: 20px;">
                <li>Interactive conversations with AI characters</li>
                <li>AI-generated art and images</li>
                <li>Creative writing assistance</li>
                <li>Music or video generation</li>
            </ul>
            <p>Just let me know which one interests you most!</p>
        `;
    }
    
    // General AI tools
    if (message.includes('ai') || message.includes('tool') || message.includes('help') || message.includes('need')) {
        return `
            <p>I'd be happy to help you find the right AI tool! To give you the best recommendation, could you tell me:</p>
            <ul style="margin: 8px 0; padding-left: 20px;">
                <li>What type of task are you trying to accomplish?</li>
                <li>Are you looking for something creative, educational, or professional?</li>
                <li>Do you prefer text-based, image-based, or interactive AI tools?</li>
            </ul>
        `;
    }
    
    // Default response
    return `
        <p>I understand you're looking for AI assistance. Could you tell me more about what you'd like to do? For example:</p>
        <ul style="margin: 8px 0; padding-left: 20px;">
            <li>Creative projects (writing, art, storytelling)</li>
            <li>Learning and education</li>
            <li>Professional tasks (coding, analysis, research)</li>
            <li>Entertainment and fun</li>
        </ul>
        <p>This will help me recommend the perfect AI tool for your needs!</p>
    `;
}

// Scroll to bottom of chat
function scrollToBottom() {
    const chatboxMessages = document.getElementById('chatboxMessages');
    if (chatboxMessages) {
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }
}

// Initialize AI search if on ai-search page
if (window.location.pathname.includes('ai-search.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeAISearch();
    });
}

// Initialize sample posts after a short delay
setTimeout(addSamplePosts, 1000);