import React, { useState, useEffect } from 'react';
import { User, GraduationCap, Users, Heart, Award, Camera, Megaphone, Music, Play, Edit, Save, X, Upload, Download, LogOut, Lock, Plus, Trash2, Settings, Menu } from 'lucide-react';

const PersonalWebsite = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cloudStatus, setCloudStatus] = useState('checking'); // 'checking', 'online', 'offline'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [content, setContent] = useState({
    logo: null, // Add logo to content
    personal: {
      name: 'Your Name',
      title: 'Student | Dreamer | Future Leader',
      about: 'Hello! I\'m a passionate student currently pursuing my education and exploring various interests. I believe in continuous learning, building meaningful relationships, and making a positive impact in my community.',
      age: '[Your Age]',
      location: '[Your City, Country]',
      interests: 'Reading, Technology, Sports',
      languages: 'English, [Other Languages]',
      email: 'your.email@example.com',
      phone: '+1 (555) 123-4567',
      social: '@yourusername',
      profileImage: null
    },
    education: {
      gs: {
        title: 'Grade School',
        school: 'Elementary School Name',
        years: '2010-2016',
        description: 'Foundation years where I developed basic academic skills and discovered my love for learning.',
        subjects: ['Mathematics', 'Science', 'English', '[Other subjects]'],
        activities: ['Student Council', 'Academic Clubs', 'Sports Teams', '[Other activities]']
      },
      hs: {
        title: 'High School',
        school: 'High School Name',
        years: '2016-2020',
        description: 'Formative years that shaped my academic interests and helped me develop leadership skills.',
        subjects: ['Mathematics', 'Science', 'English', '[Other subjects]'],
        activities: ['Student Council', 'Academic Clubs', 'Sports Teams', '[Other activities]']
      },
      shs: {
        title: 'Senior High School',
        school: 'Senior High School Name',
        years: '2020-2022',
        description: 'Specialized education that prepared me for college and helped me choose my career path.',
        subjects: ['Mathematics', 'Science', 'English', '[Other subjects]'],
        activities: ['Student Council', 'Academic Clubs', 'Sports Teams', '[Other activities]']
      },
      college: {
        title: 'College',
        school: 'University Name',
        years: '2022-Present',
        description: 'Current academic journey where I\'m pursuing my degree and developing professional skills.',
        subjects: ['Mathematics', 'Science', 'English', '[Other subjects]'],
        activities: ['Student Council', 'Academic Clubs', 'Sports Teams', '[Other activities]']
      }
    },
    family: {
      father: { 
        title: 'My Father',
        list: [{ name: 'Father\'s Name', description: 'My father is my role model and biggest supporter. He has always encouraged me to pursue my dreams.', image: null }]
      },
      mother: { 
        title: 'My Mother',
        list: [{ name: 'Mother\'s Name', description: 'My mother is the heart of our family. Her love and care have shaped who I am today.', image: null }]
      },
      siblings: { 
        title: 'My Siblings',
        list: [
          { name: 'Brother/Sister Name', description: 'My sibling is my best friend and partner in all adventures.', image: null },
          { name: 'Another Sibling', description: 'Another amazing sibling who brings joy to our family.', image: null }
        ]
      },
      grandparents: { 
        title: 'My Grand Parents',
        list: [{ name: 'Grandparents\' Names', description: 'My grandparents are the wisdom keepers of our family, sharing stories and life lessons.', image: null }]
      }
    },
    collections: [
      { name: 'Books', icon: '📚', description: 'Collection of favorite novels, academic books, and inspiring biographies.' },
      { name: 'Music', icon: '🎵', description: 'Vinyl records, CDs, and digital playlists spanning various genres.' },
      { name: 'Sports', icon: '⚽', description: 'Memorabilia from favorite teams and sports equipment collection.' }
    ],
    friends: {
      school: { title: 'School Mates', description: 'Friends who share the academic journey with me.', list: [
        { name: 'Friend 1', image: null },
        { name: 'Friend 2', image: null },
        { name: 'Friend 3', image: null }
      ]},
      church: { title: 'Church Mates', description: 'Friends from my faith community who support my spiritual growth.', list: [
        { name: 'Friend 1', image: null },
        { name: 'Friend 2', image: null },
        { name: 'Friend 3', image: null }
      ]},
      org: { title: 'Organization Friends', description: 'Friends from various clubs and organizations I\'m part of.', list: [
        { name: 'Friend 1', image: null },
        { name: 'Friend 2', image: null },
        { name: 'Friend 3', image: null }
      ]}
    },
    achievements: [
      { title: 'Academic Excellence Award', year: '2023', description: 'Recognized for outstanding academic performance' },
      { title: 'Leadership Award', year: '2023', description: 'For demonstrating exceptional leadership skills' },
      { title: 'Community Service Recognition', year: '2022', description: 'For volunteer work in the local community' },
      { title: 'Sports Achievement', year: '2022', description: 'Achievement in school sports competition' }
    ],
    gallery: [
      { title: 'Family Vacation', description: 'Summer trip with family', image: null },
      { title: 'Graduation Day', description: 'Celebrating academic milestone', image: null },
      { title: 'School Event', description: 'Participating in school activities', image: null }
    ],
    advocacy: {
      title: 'Climate Change Awareness',
      issue: 'Climate change is one of the most pressing challenges of our time, affecting ecosystems, weather patterns, and human lives globally.',
      causes: [
        'Greenhouse gas emissions from fossil fuels',
        'Deforestation and land use changes',
        'Industrial processes and agriculture',
        'Transportation and energy consumption'
      ],
      effects: [
        'Rising global temperatures',
        'Extreme weather events',
        'Sea level rise',
        'Impact on biodiversity'
      ],
      solutions: [
        'Education and awareness campaigns',
        'Sustainable lifestyle choices',
        'Support for renewable energy',
        'Community action and advocacy'
      ],
      myActions: 'I\'m committed to raising awareness about climate change through social media campaigns, participating in local environmental initiatives, and promoting sustainable practices in my school and community.'
    },
    multimedia: {
      audio: { title: 'Sample Audio Description', file: null },
      video: { title: 'Sample Video Description', file: null }
    }
  });

  // Dynamic menu generation
  const generateMenuItems = () => {
    const baseItems = [
      { id: 'personal', label: 'Personal', icon: User }
    ];

    // Education menu
    const educationSubItems = Object.keys(content.education).map(key => ({
      id: key,
      label: content.education[key].title
    }));
    
    if (educationSubItems.length > 0) {
      baseItems.push({
        id: 'education',
        label: 'Education',
        icon: GraduationCap,
        subItems: educationSubItems
      });
    }

    // Family menu
    const familySubItems = Object.keys(content.family).map(key => ({
      id: key,
      label: content.family[key].title || key.charAt(0).toUpperCase() + key.slice(1)
    }));
    
    if (familySubItems.length > 0) {
      baseItems.push({
        id: 'family',
        label: 'Family',
        icon: Users,
        subItems: familySubItems
      });
    }

    // Collections
    baseItems.push({ id: 'collections', label: 'Collections', icon: Heart });

    // Friends menu
    const friendsSubItems = Object.keys(content.friends).map(key => ({
      id: key,
      label: content.friends[key].title
    }));
    
    if (friendsSubItems.length > 0) {
      baseItems.push({
        id: 'friends',
        label: 'Friends',
        icon: Users,
        subItems: friendsSubItems
      });
    }

    // Rest of the menu
    baseItems.push(
      { id: 'achievements', label: 'Achievements', icon: Award },
      { id: 'gallery', label: 'Gallery', icon: Camera },
      { id: 'advocacy', label: 'Advocacy', icon: Megaphone }
    );

    return baseItems;
  };

  const menuItems = generateMenuItems();

  /* 
  🔐 SECURE GITHUB SETUP INSTRUCTIONS:
  
  1. Create Personal Access Token:
     - GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
     - Generate new token → Select "repo" scope → Copy token
  
  2. Keep Your Token SECURE:
     - ✅ The token will be entered at runtime (when you first save)
     - ✅ Token is stored only in memory, never in code
     - ✅ Safe for public repositories
     - ✅ Teacher can see changes without knowing your token
  
  3. How it works:
     - First time you save: System prompts for your token
     - Token is used only for that session
     - Public can read the data file without authentication
     - Only you need the token to save changes
  
  ⚠️ NEVER put your real token in the code below!
  */
  
  // GitHub API configuration - SECURE SETUP
  // NEVER put your real token here if repo is public!
  let GITHUB_TOKEN = null; // Will be set securely at runtime
  const GITHUB_OWNER = 'cmoreira99'; // Your GitHub username (safe to be public)
  const GITHUB_REPO = 'veronica-website'; // Your repository name (safe to be public)
  const DATA_FILE = 'website-data.json'; // File to store data in your repo

  // Secure token management
  const setupGitHubToken = () => {
    if (!GITHUB_TOKEN) {
      const token = prompt('🔐 Enter your GitHub Personal Access Token:\n(This will only be stored in memory, not saved)');
      if (token && token.startsWith('github_pat_') || token.startsWith('ghp_')) {
        GITHUB_TOKEN = token;
        localStorage.setItem('github-token-set', 'true'); // Just a flag, not the token
        return true;
      } else {
        alert('❌ Invalid token format. Token should start with "github_pat_" or "ghp_"');
        return false;
      }
    }
    return true;
  };

  // Check if token is set up
  const isTokenConfigured = () => {
    return GITHUB_TOKEN !== null || localStorage.getItem('github-token-set') === 'true';
  };

  // Unicode-safe base64 encoding (handles emojis and special characters)
  const unicodeToBase64 = (str) => {
    try {
      // Use TextEncoder for proper UTF-8 encoding
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      
      // Convert to base64
      let binary = '';
      data.forEach(byte => {
        binary += String.fromCharCode(byte);
      });
      
      return btoa(binary);
    } catch (error) {
      // Fallback method for older browsers
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode('0x' + p1);
      }));
    }
  };

  // Unicode-safe base64 decoding
  const base64ToUnicode = (str) => {
    try {
      // Decode base64 to binary
      const binary = atob(str);
      
      // Convert to Uint8Array
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      
      // Use TextDecoder for proper UTF-8 decoding
      const decoder = new TextDecoder();
      return decoder.decode(bytes);
    } catch (error) {
      // Fallback method
      try {
        return decodeURIComponent(atob(str).split('').map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      } catch (fallbackError) {
        // Last resort - just use atob
        return atob(str);
      }
    }
  };

  const loadFromCloud = async () => {
    try {
      setCloudStatus('checking');
      
      // For public repos, we can read without authentication
      const headers = {};
      if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
      }
      headers['Accept'] = 'application/vnd.github.v3+json';
      
      const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_FILE}`, {
        headers: headers
      });
      
      if (response.ok) {
        const data = await response.json();
        // GitHub API returns content as base64, decode it with Unicode support
        const content = JSON.parse(base64ToUnicode(data.content));
        setContent(content);
        localStorage.setItem('personalWebsiteContent', JSON.stringify(content));
        localStorage.setItem('github-file-sha', data.sha); // Store SHA for updates
        setCloudStatus('online');
        console.log('✅ Content loaded from GitHub successfully!');
      } else if (response.status === 404) {
        // File doesn't exist yet, that's ok - we'll create it on first save
        console.log('📁 Data file not found in GitHub, will create on first save');
        setCloudStatus('online');
        const savedContent = localStorage.getItem('personalWebsiteContent');
        if (savedContent) {
          setContent(JSON.parse(savedContent));
        }
      } else {
        throw new Error(`GitHub API error: ${response.status}`);
      }
    } catch (error) {
      console.log('⚠️ GitHub API failed, using local storage:', error.message);
      setCloudStatus('offline');
      // Fallback to localStorage if GitHub fails
      const savedContent = localStorage.getItem('personalWebsiteContent');
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      }
    }
  };

  const saveToCloud = async (contentData) => {
    try {
      // Check if we have a token, if not, prompt for it
      if (!setupGitHubToken()) {
        return false;
      }
      
      // Always get the current file info first to ensure we have the latest SHA
      let currentSha = localStorage.getItem('github-file-sha');
      
      // Fetch current file info to get the latest SHA
      try {
        const fileInfoResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_FILE}`, {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (fileInfoResponse.ok) {
          const fileInfo = await fileInfoResponse.json();
          currentSha = fileInfo.sha;
          localStorage.setItem('github-file-sha', currentSha);
          console.log('📥 Retrieved latest file SHA from GitHub');
        } else if (fileInfoResponse.status !== 404) {
          console.warn('⚠️ Could not fetch file info:', fileInfoResponse.status);
        }
      } catch (fetchError) {
        console.warn('⚠️ Error fetching file info:', fetchError.message);
      }
      
      // Prepare the data for GitHub API with Unicode-safe encoding
      const jsonString = JSON.stringify(contentData, null, 2);
      const fileContent = unicodeToBase64(jsonString);
      
      const body = {
        message: `Update website content - ${new Date().toISOString()}`,
        content: fileContent,
        branch: 'master' // Change to 'master' if that's your default branch
      };
      
      // Only include SHA if we have one (for file updates)
      if (currentSha) {
        body.sha = currentSha;
        console.log('🔑 Using SHA for file update:', currentSha.substring(0, 8) + '...');
      } else {
        console.log('📝 Creating new file (no SHA needed)');
      }
      
      const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_FILE}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('github-file-sha', result.content.sha);
        setCloudStatus('online');
        console.log('✅ Content saved to GitHub successfully!');
        return true;
      } else {
        const errorData = await response.json();
        console.error('GitHub API save error:', errorData);
        
        // If it's a SHA mismatch, try to fetch the latest SHA and retry once
        if (response.status === 422 && errorData.message && errorData.message.includes('sha')) {
          console.log('🔄 SHA mismatch detected, attempting to retry with fresh SHA...');
          
          try {
            // Force fetch the latest file info
            const retryFileInfo = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_FILE}`, {
              headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
              }
            });
            
            if (retryFileInfo.ok) {
              const retryData = await retryFileInfo.json();
              body.sha = retryData.sha;
              localStorage.setItem('github-file-sha', retryData.sha);
              
              // Retry the save with correct SHA
              const retryResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_FILE}`, {
                method: 'PUT',
                headers: {
                  'Authorization': `token ${GITHUB_TOKEN}`,
                  'Accept': 'application/vnd.github.v3+json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              });
              
              if (retryResponse.ok) {
                const retryResult = await retryResponse.json();
                localStorage.setItem('github-file-sha', retryResult.content.sha);
                setCloudStatus('online');
                console.log('✅ Content saved to GitHub on retry!');
                return true;
              }
            }
          } catch (retryError) {
            console.error('Retry failed:', retryError);
          }
        }
        
        throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
      }
    } catch (error) {
      console.error('Failed to save to GitHub:', error);
      setCloudStatus('offline');
    }
    return false;
  };

  useEffect(() => {
    // Load content from cloud first, then fallback to localStorage
    loadFromCloud();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saveContent = async () => {
    // Save to localStorage first (immediate)
    localStorage.setItem('personalWebsiteContent', JSON.stringify(content));
    
    // Save to GitHub (for other people to see)
    const githubSaved = await saveToCloud(content);
    
    if (githubSaved) {
      alert('✅ Content saved to GitHub! Teacher and others can now see your changes.');
    } else {
      alert('⚠️ Content saved locally, but GitHub sync failed. Check your GitHub token and repo settings.');
    }
    
    setEditMode(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'veronica' && loginForm.password === 'veronica') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Invalid credentials!');
    }
  };

  // Handle responsive design - Define breakpoints
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isSmallMobile = windowWidth <= 480;

  const handleLogout = () => {
    setIsAdmin(false);
    setEditMode(false);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-content.json';
    link.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setContent(importedData);
          localStorage.setItem('personalWebsiteContent', JSON.stringify(importedData));
        } catch (error) {
          alert('Invalid file format!');
        }
      };
      reader.readAsText(file);
    }
  };

  // Dynamic content management functions
  const addEducationLevel = () => {
    const newKey = prompt('Enter education level key (e.g., "masters", "phd"):');
    const newTitle = prompt('Enter education level title (e.g., "Master\'s Degree"):');
    
    if (newKey && newTitle && !content.education[newKey]) {
      const newContent = { ...content };
      newContent.education[newKey] = {
        title: newTitle,
        school: 'School Name',
        years: 'Years',
        description: 'Description of this education level.',
        subjects: ['Subject 1', 'Subject 2'],
        activities: ['Activity 1', 'Activity 2']
      };
      setContent(newContent);
    }
  };

  const removeEducationLevel = (key) => {
    if (window.confirm(`Remove ${content.education[key].title}?`)) {
      const newContent = { ...content };
      delete newContent.education[key];
      setContent(newContent);
      if (activeSection === key) setActiveSection('personal');
    }
  };

  const addFamilyMember = () => {
    const newKey = prompt('Enter family member category key (e.g., "uncle", "aunt", "cousins"):');
    const newTitle = prompt('Enter family member category title (e.g., "My Uncles", "My Aunts"):');
    
    if (newKey && newTitle && !content.family[newKey]) {
      const newContent = { ...content };
      newContent.family[newKey] = {
        title: newTitle,
        list: [{ name: 'New Family Member', description: 'Description of this family member.', image: null }]
      };
      setContent(newContent);
    }
  };

  const addPersonToFamily = (familyKey) => {
    const newContent = { ...content };
    newContent.family[familyKey].list.push({ 
      name: 'New Person', 
      description: 'Description of this person.', 
      image: null 
    });
    setContent(newContent);
  };

  const removePersonFromFamily = (familyKey, index) => {
    if (window.confirm('Remove this person?')) {
      const newContent = { ...content };
      newContent.family[familyKey].list.splice(index, 1);
      setContent(newContent);
    }
  };

  const removeFamilyMember = (key) => {
    if (window.confirm(`Remove ${content.family[key].name}?`)) {
      const newContent = { ...content };
      delete newContent.family[key];
      setContent(newContent);
      if (activeSection === key) setActiveSection('personal');
    }
  };

  const addFriendsCategory = () => {
    const newKey = prompt('Enter friends category key (e.g., "scout", "work"):');
    const newTitle = prompt('Enter friends category title (e.g., "Scout Friends"):');
    
    if (newKey && newTitle && !content.friends[newKey]) {
      const newContent = { ...content };
      newContent.friends[newKey] = {
        title: newTitle,
        description: `Friends from ${newTitle.toLowerCase()}.`,
        list: [
          { name: 'Friend 1', image: null },
          { name: 'Friend 2', image: null }
        ]
      };
      setContent(newContent);
    }
  };

  const removeFriendsCategory = (key) => {
    if (window.confirm(`Remove ${content.friends[key].title} category?`)) {
      const newContent = { ...content };
      delete newContent.friends[key];
      setContent(newContent);
      if (activeSection === key) setActiveSection('personal');
    }
  };

  const addFriend = (category) => {
    const newContent = { ...content };
    newContent.friends[category].list.push({ name: 'New Friend', image: null });
    setContent(newContent);
  };

  const removeFriend = (category, index) => {
    if (window.confirm('Remove this friend?')) {
      const newContent = { ...content };
      newContent.friends[category].list.splice(index, 1);
      setContent(newContent);
    }
  };

  const addGalleryItem = () => {
    const newContent = { ...content };
    newContent.gallery.push({ title: 'New Photo', description: 'Photo description', image: null });
    setContent(newContent);
  };

  const removeGalleryItem = (index) => {
    if (window.confirm('Remove this photo?')) {
      const newContent = { ...content };
      newContent.gallery.splice(index, 1);
      setContent(newContent);
    }
  };

  const addAchievement = () => {
    const newContent = { ...content };
    newContent.achievements.push({ title: 'New Achievement', year: new Date().getFullYear().toString(), description: 'Achievement description' });
    setContent(newContent);
  };

  const removeAchievement = (index) => {
    if (window.confirm('Remove this achievement?')) {
      const newContent = { ...content };
      newContent.achievements.splice(index, 1);
      setContent(newContent);
    }
  };

  const addCollection = () => {
    const newContent = { ...content };
    newContent.collections.push({ name: 'New Collection', icon: '📦', description: 'Collection description' });
    setContent(newContent);
  };

  const removeCollection = (index) => {
    if (window.confirm('Remove this collection?')) {
      const newContent = { ...content };
      newContent.collections.splice(index, 1);
      setContent(newContent);
    }
  };

  const handleImageUpload = (section, key, index = null) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newContent = { ...content };
          
          // Handle logo upload
          if (section === 'logo') {
            newContent.logo = event.target.result;
          }
          // Handle family image uploads with new structure
          else if (section === 'family' && key.includes('.list.')) {
            const parts = key.split('.');
            const familyKey = parts[0];
            const listIndex = parseInt(parts[2]);
            const imageKey = parts[3];
            newContent.family[familyKey].list[listIndex][imageKey] = event.target.result;
          }
          // Handle other image uploads
          else if (index !== null) {
            if (key.includes('.')) {
              const keys = key.split('.');
              newContent[section][keys[0]].list[index][keys[1]] = event.target.result;
            } else {
              newContent[section][index][key] = event.target.result;
            }
          } else if (key.includes('.')) {
            const keys = key.split('.');
            newContent[section][keys[0]][keys[1]] = event.target.result;
          } else {
            newContent[section][key] = event.target.result;
          }
          setContent(newContent);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleFileUpload = (section, key) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = section === 'audio' ? 'audio/*' : 'video/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newContent = { ...content };
          newContent.multimedia[section][key] = event.target.result;
          setContent(newContent);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const updateContent = (section, key, value, index = null) => {
    const newContent = { ...content };
    if (index !== null) {
      if (key.includes('.')) {
        const keys = key.split('.');
        if (keys.length === 3) {
          newContent[section][keys[0]].list[index][keys[1]][keys[2]] = value;
        } else {
          newContent[section][keys[0]].list[index][keys[1]] = value;
        }
      } else {
        newContent[section][index][key] = value;
      }
    } else if (key.includes('.')) {
      const keys = key.split('.');
      if (keys.length === 3) {
        newContent[section][keys[0]][keys[1]][keys[2]] = value;
      } else {
        newContent[section][keys[0]][keys[1]] = value;
      }
    } else {
      newContent[section][key] = value;
    }
    setContent(newContent);
  };

  const renderEditableInput = (value, onChange, type = 'text', isTextarea = false) => {
    if (!editMode) return value;
    
    if (isTextarea) {
      return React.createElement('textarea', {
        value: value,
        onChange: (e) => onChange(e.target.value),
        style: {
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          resize: 'none',
          fontFamily: 'inherit',
          fontSize: 'inherit'
        },
        rows: 3
      });
    }
    
    return React.createElement('input', {
      type: type,
      value: value,
      onChange: (e) => onChange(e.target.value),
      style: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontFamily: 'inherit',
        fontSize: 'inherit'
      }
    });
  };

  // Responsive styles that adapt to screen size
  const getResponsiveStyles = () => ({
    container: {
      minHeight: '100vh',
      backgroundColor: '#fefcff',
      fontFamily: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      color: 'white',
      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
      position: 'relative',
      overflow: 'visible',
      zIndex: 1000
    },
    headerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
      pointerEvents: 'none'
    },
    headerContent: {
      maxWidth: isMobile ? '100%' : '1400px',
      margin: '0 auto',
      padding: isMobile ? '12px 16px' : '20px 24px',
      position: 'relative',
      zIndex: 2
    },
    headerTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginBottom: isMobile ? '12px' : '20px',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '12px' : '0'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '12px' : '16px',
      width: isMobile ? '100%' : 'auto'
    },
    logo: {
      width: isMobile ? '36px' : '48px',
      height: isMobile ? '36px' : '48px',
      borderRadius: isMobile ? '8px' : '12px',
      objectFit: 'cover',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    },
    logoPlaceholder: {
      width: isMobile ? '36px' : '48px',
      height: isMobile ? '36px' : '48px',
      borderRadius: isMobile ? '8px' : '12px',
      background: 'rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed rgba(255, 255, 255, 0.4)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    logoPlaceholderHover: {
      background: 'rgba(255, 255, 255, 0.3)',
      borderColor: 'rgba(255, 255, 255, 0.6)'
    },
    title: {
      fontSize: isMobile ? '18px' : isTablet ? '24px' : '28px',
      fontWeight: '700',
      margin: 0,
      background: 'linear-gradient(45deg, #ffffff 0%, #f8fafc 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 2px 10px rgba(0,0,0,0.1)',
      flex: 1
    },
    adminControls: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '6px' : '12px',
      flexWrap: 'wrap',
      width: isMobile ? '100%' : 'auto',
      justifyContent: isMobile ? 'flex-start' : 'flex-end'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '4px' : '8px',
      padding: isMobile ? '8px 12px' : '10px 18px',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      color: 'white',
      border: 'none',
      borderRadius: isMobile ? '8px' : '12px',
      cursor: 'pointer',
      fontSize: isMobile ? '12px' : '14px',
      fontWeight: '500',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    buttonHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
    },
    buttonGreen: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
    },
    buttonRed: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
    },
    buttonSmall: {
      padding: isMobile ? '4px 8px' : '6px 12px',
      fontSize: isMobile ? '10px' : '12px',
      borderRadius: '8px'
    },
    nav: {
      display: isMobile ? 'none' : 'flex',
      flexWrap: 'wrap',
      gap: isTablet ? '6px' : '8px'
    },
    mobileMenuButton: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%',
      justifyContent: 'center'
    },
    mobileMenuOpen: {
      display: 'block',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      color: '#374151',
      borderRadius: '12px',
      marginTop: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(20px)',
      overflow: 'hidden'
    },
    mobileMenuItem: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '16px 20px',
      backgroundColor: 'transparent',
      color: '#374151',
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease'
    },
    mobileSubItem: {
      paddingLeft: '40px',
      backgroundColor: '#f8fafc',
      fontSize: '14px'
    },
    navItem: {
      position: 'relative',
      zIndex: 1001
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      gap: isTablet ? '6px' : '8px',
      padding: isTablet ? '10px 16px' : '12px 20px',
      backgroundColor: 'transparent',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: isTablet ? '13px' : '14px',
      fontWeight: '500',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)'
    },
    navButtonActive: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 15px rgba(255,255,255,0.1)',
      transform: 'translateY(-1px)'
    },
    navButtonHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-1px)'
    },
    dropdown: {
      position: 'absolute',
      left: 0,
      top: '100%',
      marginTop: '8px',
      width: '220px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      color: '#374151',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      opacity: 0,
      visibility: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 99999,
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      overflow: 'hidden'
    },
    dropdownVisible: {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateY(0)'
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      textAlign: 'left',
      padding: '12px 16px',
      backgroundColor: 'transparent',
      color: '#374151',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    },
    dropdownItemHover: {
      backgroundColor: 'rgba(102, 126, 234, 0.08)',
      color: '#667eea'
    },
    main: {
      maxWidth: isMobile ? '100%' : '1400px',
      margin: '0 auto',
      padding: isMobile ? '20px 16px' : isTablet ? '30px 20px' : '40px 24px',
      flex: 1,
      position: 'relative',
      zIndex: 1
    },
    card: {
      backgroundColor: 'white',
      borderRadius: isMobile ? '16px' : '20px',
      padding: isMobile ? '20px' : isTablet ? '24px' : '32px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
      marginBottom: isMobile ? '16px' : '24px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
      borderColor: 'rgba(102, 126, 234, 0.2)'
    },
    cardGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent)',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },
    grid: {
      display: 'grid',
      gap: isMobile ? '16px' : '24px'
    },
    gridMd2: {
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'repeat(auto-fit, minmax(320px, 1fr))'
    },
    gridLg3: {
      gridTemplateColumns: isMobile ? '1fr' : isSmallMobile ? '1fr' : isTablet ? 'repeat(auto-fit, minmax(240px, 1fr))' : 'repeat(auto-fit, minmax(280px, 1fr))'
    },
    textCenter: {
      textAlign: 'center'
    },
    profileImage: {
      width: isMobile ? '100px' : isTablet ? '120px' : '140px',
      height: isMobile ? '100px' : isTablet ? '120px' : '140px',
      borderRadius: '50%',
      margin: isMobile ? '0 auto 20px' : '0 auto 32px',
      objectFit: 'cover',
      border: '4px solid rgba(102, 126, 234, 0.1)',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.2)'
    },
    profilePlaceholder: {
      width: isMobile ? '100px' : isTablet ? '120px' : '140px',
      height: isMobile ? '100px' : isTablet ? '120px' : '140px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      borderRadius: '50%',
      margin: isMobile ? '0 auto 20px' : '0 auto 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: isMobile ? '40px' : isTablet ? '48px' : '56px',
      fontWeight: '700',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)',
      border: '4px solid rgba(255, 255, 255, 0.2)'
    },
    avatarSmall: {
      width: isMobile ? '60px' : '72px',
      height: isMobile ? '60px' : '72px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid rgba(102, 126, 234, 0.1)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    },
    avatarPlaceholder: {
      width: isMobile ? '60px' : '72px',
      height: isMobile ? '60px' : '72px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: isMobile ? '20px' : '28px',
      fontWeight: '600',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
      border: '3px solid rgba(255, 255, 255, 0.2)'
    },
    achievementItem: {
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? '12px' : '20px',
      backgroundColor: 'white',
      borderRadius: isMobile ? '16px' : '20px',
      padding: isMobile ? '20px' : '28px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
      marginBottom: '16px',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      flexDirection: isMobile ? 'column' : 'row',
      textAlign: isMobile ? 'center' : 'left'
    },
    achievementIcon: {
      width: isMobile ? '48px' : '56px',
      height: isMobile ? '48px' : '56px',
      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      borderRadius: isMobile ? '12px' : '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)',
      margin: isMobile ? '0 auto' : '0'
    },
    galleryItem: {
      backgroundColor: 'white',
      borderRadius: isMobile ? '16px' : '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative'
    },
    galleryImage: {
      width: '100%',
      height: isMobile ? '180px' : isTablet ? '200px' : '220px',
      objectFit: 'cover'
    },
    galleryPlaceholder: {
      width: '100%',
      height: isMobile ? '180px' : isTablet ? '200px' : '220px',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #ddd6fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    multimedia: {
      backgroundColor: 'white',
      padding: isMobile ? '32px 0' : '48px 0',
      borderTop: '1px solid rgba(102, 126, 234, 0.1)',
      position: 'relative'
    },
    multimediaContent: {
      maxWidth: isMobile ? '100%' : '1400px',
      margin: '0 auto',
      padding: isMobile ? '0 16px' : '0 24px'
    },
    multimediaGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(auto-fit, minmax(420px, 1fr))',
      gap: isMobile ? '24px' : '32px'
    },
    multimediaCard: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      borderRadius: isMobile ? '20px' : '24px',
      padding: isMobile ? '24px' : '32px',
      border: '1px solid rgba(102, 126, 234, 0.1)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
    },
    multimediaInner: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: isMobile ? '20px' : '24px',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.8)'
    },
    mediaPlaceholder: {
      width: '100%',
      height: isMobile ? '120px' : '160px',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      border: '2px dashed rgba(102, 126, 234, 0.2)'
    },
    footer: {
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      color: 'white',
      padding: isMobile ? '24px 0' : '32px 0',
      textAlign: 'center',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    },
    footerContent: {
      maxWidth: isMobile ? '100%' : '1400px',
      margin: '0 auto',
      padding: isMobile ? '0 16px' : '0 24px',
      position: 'relative',
      zIndex: 2
    },
    footerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1) 0%, transparent 50%, rgba(240, 147, 251, 0.1) 100%)',
      pointerEvents: 'none'
    },
    loginModal: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    loginCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: isMobile ? '30px 20px' : '40px',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
      width: isMobile ? '100%' : '420px',
      maxWidth: '90vw',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      color: '#374151',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
      backgroundColor: 'white'
    },
    buttonPrimary: {
      flex: 1,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '14px 24px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    buttonPrimaryHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
    },
    buttonSecondary: {
      flex: 1,
      backgroundColor: '#f3f4f6',
      color: '#374151',
      padding: '14px 24px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    flexRow: {
      display: 'flex',
      gap: '16px',
      flexDirection: isMobile ? 'column' : 'row'
    },
    uploadButton: {
      position: 'absolute',
      bottom: '8px',
      right: '8px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: isMobile ? '8px' : '10px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
      transition: 'all 0.3s ease'
    },
    uploadButtonHover: {
      transform: 'scale(1.1)',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
    },
    deleteButton: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      padding: isMobile ? '6px' : '8px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
      transition: 'all 0.3s ease',
      zIndex: 10
    },
    deleteButtonHover: {
      transform: 'scale(1.1)',
      boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)'
    },
    relative: {
      position: 'relative'
    },
    hiddenInput: {
      display: 'none'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: isMobile ? '20px' : '32px',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '12px' : '0'
    },
    addButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: isMobile ? '10px 16px' : '12px 20px',
      cursor: 'pointer',
      fontSize: isMobile ? '12px' : '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '6px' : '8px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
    },
    addButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
    },
    sectionTitle: {
      fontSize: isMobile ? '24px' : isTablet ? '28px' : '32px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
      lineHeight: 1.2,
      textAlign: isMobile ? 'center' : 'left'
    },
    subtitle: {
      fontSize: isMobile ? '16px' : '18px',
      color: '#6b7280',
      fontWeight: '400',
      lineHeight: 1.5
    },
    overviewCard: {
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    overviewCardHover: {
      transform: 'translateY(-6px)',
      boxShadow: '0 20px 50px rgba(102, 126, 234, 0.15)'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '600'
    }
  });

  // Get responsive styles
  const styles = getResponsiveStyles();

  const renderContent = () => {
    // Check if activeSection is a family member
    if (content.family && content.family[activeSection]) {
      const familyGroup = content.family[activeSection];
      
      return (
        <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
          <div style={styles.sectionHeader}>
            <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1f2937', margin: 0, textAlign: isMobile ? 'center' : 'left' }}>{familyGroup.title}</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-end' }}>
              {editMode && (
                <>
                  <button 
                    onClick={() => addPersonToFamily(activeSection)} 
                    style={styles.addButton}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.addButtonHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.addButton)}
                  >
                    <Plus size={16} />
                    Add Person
                  </button>
                  <button
                    onClick={() => removeFamilyMember(activeSection)}
                    style={{ ...styles.button, ...styles.buttonRed }}
                  >
                    <Trash2 size={16} />
                    Remove Category
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div style={{ ...styles.grid, ...styles.gridLg3 }}>
            {familyGroup.list.map((person, index) => (
              <div key={index} style={{ ...styles.card, position: 'relative' }}>
                {editMode && (
                  <button
                    onClick={() => removePersonFromFamily(activeSection, index)}
                    style={styles.deleteButton}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteButtonHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteButton)}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '16px' : '20px' }}>
                  <div style={styles.relative}>
                    {person.image ? (
                      <img src={person.image} alt={person.name} style={{ ...styles.avatarSmall, width: isMobile ? '80px' : '96px', height: isMobile ? '80px' : '96px', margin: '0 auto' }} />
                    ) : (
                      <div style={{ ...styles.avatarPlaceholder, width: isMobile ? '80px' : '96px', height: isMobile ? '80px' : '96px', fontSize: isMobile ? '28px' : '32px', margin: '0 auto' }}>
                        {person.name.charAt(0)}
                      </div>
                    )}
                    {editMode && (
                      <button
                        onClick={() => handleImageUpload('family', `${activeSection}.list.${index}.image`)}
                        style={{ ...styles.uploadButton, bottom: '-8px', right: 'calc(50% - 40px)', padding: '8px' }}
                        onMouseEnter={(e) => Object.assign(e.target.style, styles.uploadButtonHover)}
                        onMouseLeave={(e) => Object.assign(e.target.style, styles.uploadButton)}
                      >
                        <Upload size={12} />
                      </button>
                    )}
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: isMobile ? '18px' : '20px', color: '#667eea', marginBottom: '12px', fontWeight: '600' }}>
                    {renderEditableInput(person.name, (value) => {
                      const newContent = { ...content };
                      newContent.family[activeSection].list[index].name = value;
                      setContent(newContent);
                    })}
                  </h3>
                  <p style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '14px' }}>
                    {renderEditableInput(person.description, (value) => {
                      const newContent = { ...content };
                      newContent.family[activeSection].list[index].description = value;
                      setContent(newContent);
                    }, 'text', true)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Check if activeSection is an education level
    if (content.education && content.education[activeSection]) {
      const edu = content.education[activeSection];
      return (
        <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
          <div style={styles.sectionHeader}>
            <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1f2937', margin: 0, textAlign: isMobile ? 'center' : 'left' }}>Education Level</h2>
            {editMode && (
              <button
                onClick={() => removeEducationLevel(activeSection)}
                style={{ ...styles.button, ...styles.buttonRed }}
              >
                <Trash2 size={16} />
                Remove Level
              </button>
            )}
          </div>
          
          <div style={styles.card}>
            <h3 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
              {renderEditableInput(edu.title, (value) => updateContent('education', `${activeSection}.title`, value))}
            </h3>
            <h4 style={{ fontSize: isMobile ? '16px' : '18px', color: '#3b82f6', marginBottom: '8px' }}>
              {renderEditableInput(edu.school, (value) => updateContent('education', `${activeSection}.school`, value))}
            </h4>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              {renderEditableInput(edu.years, (value) => updateContent('education', `${activeSection}.years`, value))}
            </p>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              {renderEditableInput(edu.description, (value) => updateContent('education', `${activeSection}.description`, value), 'text', true)}
            </p>
          </div>

          <div style={{ ...styles.grid, ...styles.gridMd2 }}>
            <div style={styles.card}>
              <div style={styles.sectionHeader}>
                <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Subjects/Courses</h3>
                {editMode && (
                  <button
                    onClick={() => {
                      const newSubjects = [...edu.subjects, 'New Subject'];
                      updateContent('education', `${activeSection}.subjects`, newSubjects);
                    }}
                    style={styles.addButton}
                  >
                    <Plus size={14} />
                    Add
                  </button>
                )}
              </div>
              <ul style={{ color: '#6b7280', lineHeight: '1.8' }}>
                {edu.subjects.map((subject, index) => (
                  <li key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    • {editMode ? (
                      <>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => {
                            const newSubjects = [...edu.subjects];
                            newSubjects[index] = e.target.value;
                            updateContent('education', `${activeSection}.subjects`, newSubjects);
                          }}
                          style={{ ...styles.input, flex: 1, padding: '4px 8px', fontSize: '14px' }}
                        />
                        <button
                          onClick={() => {
                            const newSubjects = edu.subjects.filter((_, i) => i !== index);
                            updateContent('education', `${activeSection}.subjects`, newSubjects);
                          }}
                          style={{ ...styles.buttonSmall, ...styles.buttonRed, padding: '2px' }}
                        >
                          <X size={12} />
                        </button>
                      </>
                    ) : subject}
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.card}>
              <div style={styles.sectionHeader}>
                <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Activities</h3>
                {editMode && (
                  <button
                    onClick={() => {
                      const newActivities = [...edu.activities, 'New Activity'];
                      updateContent('education', `${activeSection}.activities`, newActivities);
                    }}
                    style={styles.addButton}
                  >
                    <Plus size={14} />
                    Add
                  </button>
                )}
              </div>
              <ul style={{ color: '#6b7280', lineHeight: '1.8' }}>
                {edu.activities.map((activity, index) => (
                  <li key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    • {editMode ? (
                      <>
                        <input
                          type="text"
                          value={activity}
                          onChange={(e) => {
                            const newActivities = [...edu.activities];
                            newActivities[index] = e.target.value;
                            updateContent('education', `${activeSection}.activities`, newActivities);
                          }}
                          style={{ ...styles.input, flex: 1, padding: '4px 8px', fontSize: '14px' }}
                        />
                        <button
                          onClick={() => {
                            const newActivities = edu.activities.filter((_, i) => i !== index);
                            updateContent('education', `${activeSection}.activities`, newActivities);
                          }}
                          style={{ ...styles.buttonSmall, ...styles.buttonRed, padding: '2px' }}
                        >
                          <X size={12} />
                        </button>
                      </>
                    ) : activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Check if activeSection is a friends category
    if (content.friends && content.friends[activeSection]) {
      const friendGroup = content.friends[activeSection];
      return (
        <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
          <div style={styles.sectionHeader}>
            <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1f2937', margin: 0, textAlign: isMobile ? 'center' : 'left' }}>
              {renderEditableInput(friendGroup.title, (value) => updateContent('friends', `${activeSection}.title`, value))}
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-end' }}>
              {editMode && (
                <>
                  <button onClick={() => addFriend(activeSection)} style={styles.addButton}>
                    <Plus size={16} />
                    Add Friend
                  </button>
                  <button
                    onClick={() => removeFriendsCategory(activeSection)}
                    style={{ ...styles.button, ...styles.buttonRed }}
                  >
                    <Trash2 size={16} />
                    Remove Category
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div style={styles.card}>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              {renderEditableInput(friendGroup.description, (value) => updateContent('friends', `${activeSection}.description`, value), 'text', true)}
            </p>
            
            <div style={{ ...styles.grid, ...styles.gridLg3 }}>
              {friendGroup.list.map((friend, index) => (
                <div key={index} style={{ ...styles.textCenter, position: 'relative' }}>
                  {editMode && (
                    <button
                      onClick={() => removeFriend(activeSection, index)}
                      style={{ ...styles.deleteButton, top: 0, right: '20px' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                  <div style={styles.relative}>
                    {friend.image ? (
                      <img src={friend.image} alt={friend.name} style={styles.avatarSmall} />
                    ) : (
                      <div style={{ ...styles.avatarPlaceholder, background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}>
                        {friend.name.charAt(0)}
                      </div>
                    )}
                    {editMode && (
                      <button
                        onClick={() => handleImageUpload('friends', `${activeSection}.list.${index}.image`)}
                        style={{ ...styles.uploadButton, bottom: '-4px', right: '-4px', padding: '4px' }}
                      >
                        <Upload size={12} />
                      </button>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                    {renderEditableInput(friend.name, (value) => {
                      const newList = [...friendGroup.list];
                      newList[index].name = value;
                      updateContent('friends', `${activeSection}.list`, newList);
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Handle static sections with switch statement
    switch(activeSection) {
      case 'personal':
        return (
          <div style={{ ...styles.grid, gap: isMobile ? '24px' : '32px' }}>
            <div style={styles.textCenter}>
              <div style={styles.relative}>
                {content.personal.profileImage ? (
                  <img src={content.personal.profileImage} alt="Profile" style={styles.profileImage} />
                ) : (
                  <div style={styles.profilePlaceholder}>
                    {content.personal.name.charAt(0)}
                  </div>
                )}
                {editMode && (
                  <button
                    onClick={() => handleImageUpload('personal', 'profileImage')}
                    style={styles.uploadButton}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.uploadButtonHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.uploadButton)}
                  >
                    <Upload size={16} />
                  </button>
                )}
              </div>
              <h2 style={{ fontSize: isMobile ? '28px' : isTablet ? '32px' : '36px', fontWeight: '700', color: '#1f2937', marginBottom: '12px', lineHeight: '1.2' }}>
                {renderEditableInput(content.personal.name, (value) => updateContent('personal', 'name', value))}
              </h2>
              <p style={styles.subtitle}>
                {renderEditableInput(content.personal.title, (value) => updateContent('personal', 'title', value))}
              </p>
            </div>
            
            <div style={styles.card}>
              <h3 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>✨ About Me</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7', fontSize: isMobile ? '14px' : '16px' }}>
                {renderEditableInput(content.personal.about, (value) => updateContent('personal', 'about', value), 'text', true)}
              </p>
            </div>

            <div style={{ ...styles.grid, ...styles.gridMd2 }}>
              <div style={styles.card}>
                <h3 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>💫 Quick Facts</h3>
                <div style={{ color: '#6b7280', lineHeight: '2', fontSize: isMobile ? '14px' : '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '4px' : '0' }}>
                    <span style={{ fontWeight: '600', minWidth: isMobile ? 'auto' : '80px', color: '#374151' }}>Age:</span> 
                    {renderEditableInput(content.personal.age, (value) => updateContent('personal', 'age', value))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '4px' : '0' }}>
                    <span style={{ fontWeight: '600', minWidth: isMobile ? 'auto' : '80px', color: '#374151' }}>Location:</span> 
                    {renderEditableInput(content.personal.location, (value) => updateContent('personal', 'location', value))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '4px' : '0' }}>
                    <span style={{ fontWeight: '600', minWidth: isMobile ? 'auto' : '80px', color: '#374151' }}>Interests:</span> 
                    {renderEditableInput(content.personal.interests, (value) => updateContent('personal', 'interests', value))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '4px' : '0' }}>
                    <span style={{ fontWeight: '600', minWidth: isMobile ? 'auto' : '80px', color: '#374151' }}>Languages:</span> 
                    {renderEditableInput(content.personal.languages, (value) => updateContent('personal', 'languages', value))}
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <h3 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>📞 Contact</h3>
                <div style={{ color: '#6b7280', lineHeight: '2', fontSize: isMobile ? '14px' : '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '4px' : '0' }}>
                    <span style={{ fontWeight: '600', minWidth: isMobile ? 'auto' : '60px', color: '#374151' }}>Email:</span> 
                    {renderEditableInput(content.personal.email, (value) => updateContent('personal', 'email', value))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '4px' : '0' }}>
                    <span style={{ fontWeight: '600', minWidth: isMobile ? 'auto' : '60px', color: '#374151' }}>Phone:</span> 
                    {renderEditableInput(content.personal.phone, (value) => updateContent('personal', 'phone', value))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? '4px' : '0' }}>
                    <span style={{ fontWeight: '600', minWidth: isMobile ? 'auto' : '60px', color: '#374151' }}>Social:</span> 
                    {renderEditableInput(content.personal.social, (value) => updateContent('personal', 'social', value))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'collections':
        return (
          <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
            <div style={styles.sectionHeader}>
              <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1f2937', margin: 0, textAlign: isMobile ? 'center' : 'left' }}>My Collections & Interests</h2>
              {editMode && (
                <button onClick={addCollection} style={styles.addButton}>
                  <Plus size={16} />
                  Add Collection
                </button>
              )}
            </div>
            
            <div style={{ ...styles.grid, ...styles.gridLg3 }}>
              {content.collections.map((collection, index) => (
                <div key={index} style={{ ...styles.card, position: 'relative' }}>
                  {editMode && (
                    <button
                      onClick={() => removeCollection(index)}
                      style={styles.deleteButton}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div style={styles.textCenter}>
                    <div style={{ width: isMobile ? '56px' : '64px', height: isMobile ? '56px' : '64px', backgroundColor: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                      <span style={{ fontSize: isMobile ? '28px' : '32px' }}>{editMode ? (
                        <input
                          type="text"
                          value={collection.icon}
                          onChange={(e) => {
                            const newCollections = [...content.collections];
                            newCollections[index].icon = e.target.value;
                            updateContent('collections', '', newCollections);
                          }}
                          style={{ width: '40px', textAlign: 'center', border: 'none', background: 'transparent', fontSize: isMobile ? '28px' : '32px' }}
                        />
                      ) : collection.icon}</span>
                    </div>
                    <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                      {renderEditableInput(collection.name, (value) => {
                        const newCollections = [...content.collections];
                        newCollections[index].name = value;
                        updateContent('collections', '', newCollections);
                      })}
                    </h3>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center' }}>
                    {renderEditableInput(collection.description, (value) => {
                      const newCollections = [...content.collections];
                      newCollections[index].description = value;
                      updateContent('collections', '', newCollections);
                    }, 'text', true)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
            <div style={styles.sectionHeader}>
              <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1f2937', margin: 0, textAlign: isMobile ? 'center' : 'left' }}>My Achievements</h2>
              {editMode && (
                <button onClick={addAchievement} style={styles.addButton}>
                  <Plus size={16} />
                  Add Achievement
                </button>
              )}
            </div>
            
            <div style={{ ...styles.grid, gap: '16px' }}>
              {content.achievements.map((achievement, index) => (
                <div key={index} style={{ ...styles.achievementItem, position: 'relative' }}>
                  {editMode && (
                    <button
                      onClick={() => removeAchievement(index)}
                      style={styles.deleteButton}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div style={styles.achievementIcon}>
                    <Award size={isMobile ? 20 : 24} color="#d97706" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                      {renderEditableInput(achievement.title, (value) => {
                        const newAchievements = [...content.achievements];
                        newAchievements[index].title = value;
                        updateContent('achievements', '', newAchievements);
                      })}
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '4px', fontSize: isMobile ? '14px' : '16px' }}>
                      {renderEditableInput(achievement.description, (value) => {
                        const newAchievements = [...content.achievements];
                        newAchievements[index].description = value;
                        updateContent('achievements', '', newAchievements);
                      })}
                    </p>
                    <span style={{ fontSize: '14px', color: '#3b82f6' }}>
                      {renderEditableInput(achievement.year, (value) => {
                        const newAchievements = [...content.achievements];
                        newAchievements[index].year = value;
                        updateContent('achievements', '', newAchievements);
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
            <div style={styles.sectionHeader}>
              <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1f2937', margin: 0, textAlign: isMobile ? 'center' : 'left' }}>Photo Gallery</h2>
              {editMode && (
                <button onClick={addGalleryItem} style={styles.addButton}>
                  <Plus size={16} />
                  Add Photo
                </button>
              )}
            </div>
            
            <div style={{ ...styles.grid, ...styles.gridLg3 }}>
              {content.gallery.map((photo, index) => (
                <div key={index} style={styles.galleryItem}>
                  <div style={styles.relative}>
                    {photo.image ? (
                      <img src={photo.image} alt={photo.title} style={styles.galleryImage} />
                    ) : (
                      <div style={styles.galleryPlaceholder}>
                        <Camera size={48} color="#6b7280" />
                      </div>
                    )}
                    {editMode && (
                      <>
                        <button
                          onClick={() => handleImageUpload('gallery', 'image', index)}
                          style={{ ...styles.uploadButton, top: '8px', right: '8px' }}
                        >
                          <Upload size={16} />
                        </button>
                        <button
                          onClick={() => removeGalleryItem(index)}
                          style={{ ...styles.deleteButton, top: '8px', left: '8px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                  <div style={{ padding: isMobile ? '12px' : '16px' }}>
                    <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px', fontSize: isMobile ? '16px' : '18px' }}>
                      {renderEditableInput(photo.title, (value) => {
                        const newGallery = [...content.gallery];
                        newGallery[index].title = value;
                        updateContent('gallery', '', newGallery);
                      })}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                      {renderEditableInput(photo.description, (value) => {
                        const newGallery = [...content.gallery];
                        newGallery[index].description = value;
                        updateContent('gallery', '', newGallery);
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'advocacy':
        const advocacy = content.advocacy;
        return (
          <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
            <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: isMobile ? '16px' : '24px', textAlign: isMobile ? 'center' : 'left' }}>Advocacy for Social Change</h2>
            
            <div style={styles.card}>
              <h3 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                {renderEditableInput(advocacy.title, (value) => updateContent('advocacy', 'title', value))}
              </h3>
              
              <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
                <div>
                  <h4 style={{ fontWeight: '600', color: '#3b82f6', marginBottom: '8px', fontSize: isMobile ? '16px' : '18px' }}>The Issue</h4>
                  <p style={{ color: '#6b7280', fontSize: isMobile ? '14px' : '16px' }}>
                    {renderEditableInput(advocacy.issue, (value) => updateContent('advocacy', 'issue', value), 'text', true)}
                  </p>
                </div>

                <div>
                  <div style={styles.sectionHeader}>
                    <h4 style={{ fontWeight: '600', color: '#3b82f6', margin: 0, fontSize: isMobile ? '16px' : '18px' }}>Causes</h4>
                    {editMode && (
                      <button
                        onClick={() => {
                          const newCauses = [...advocacy.causes, 'New cause'];
                          updateContent('advocacy', 'causes', newCauses);
                        }}
                        style={{ ...styles.addButton, ...styles.buttonSmall }}
                      >
                        <Plus size={12} />
                        Add
                      </button>
                    )}
                  </div>
                  <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '20px', fontSize: isMobile ? '14px' : '16px' }}>
                    {advocacy.causes.map((cause, index) => (
                      <li key={index} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={cause}
                              onChange={(e) => {
                                const newCauses = [...advocacy.causes];
                                newCauses[index] = e.target.value;
                                updateContent('advocacy', 'causes', newCauses);
                              }}
                              style={{ ...styles.input, flex: 1, padding: '4px 8px', fontSize: '14px' }}
                            />
                            <button
                              onClick={() => {
                                const newCauses = advocacy.causes.filter((_, i) => i !== index);
                                updateContent('advocacy', 'causes', newCauses);
                              }}
                              style={{ ...styles.buttonSmall, ...styles.buttonRed, padding: '2px' }}
                            >
                              <X size={12} />
                            </button>
                          </>
                        ) : cause}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div style={styles.sectionHeader}>
                    <h4 style={{ fontWeight: '600', color: '#3b82f6', margin: 0, fontSize: isMobile ? '16px' : '18px' }}>Effects</h4>
                    {editMode && (
                      <button
                        onClick={() => {
                          const newEffects = [...advocacy.effects, 'New effect'];
                          updateContent('advocacy', 'effects', newEffects);
                        }}
                        style={{ ...styles.addButton, ...styles.buttonSmall }}
                      >
                        <Plus size={12} />
                        Add
                      </button>
                    )}
                  </div>
                  <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '20px', fontSize: isMobile ? '14px' : '16px' }}>
                    {advocacy.effects.map((effect, index) => (
                      <li key={index} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={effect}
                              onChange={(e) => {
                                const newEffects = [...advocacy.effects];
                                newEffects[index] = e.target.value;
                                updateContent('advocacy', 'effects', newEffects);
                              }}
                              style={{ ...styles.input, flex: 1, padding: '4px 8px', fontSize: '14px' }}
                            />
                            <button
                              onClick={() => {
                                const newEffects = advocacy.effects.filter((_, i) => i !== index);
                                updateContent('advocacy', 'effects', newEffects);
                              }}
                              style={{ ...styles.buttonSmall, ...styles.buttonRed, padding: '2px' }}
                            >
                              <X size={12} />
                            </button>
                          </>
                        ) : effect}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div style={styles.sectionHeader}>
                    <h4 style={{ fontWeight: '600', color: '#3b82f6', margin: 0, fontSize: isMobile ? '16px' : '18px' }}>Process of Change</h4>
                    {editMode && (
                      <button
                        onClick={() => {
                          const newSolutions = [...advocacy.solutions, 'New solution'];
                          updateContent('advocacy', 'solutions', newSolutions);
                        }}
                        style={{ ...styles.addButton, ...styles.buttonSmall }}
                      >
                        <Plus size={12} />
                        Add
                      </button>
                    )}
                  </div>
                  <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '20px', fontSize: isMobile ? '14px' : '16px' }}>
                    {advocacy.solutions.map((solution, index) => (
                      <li key={index} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={solution}
                              onChange={(e) => {
                                const newSolutions = [...advocacy.solutions];
                                newSolutions[index] = e.target.value;
                                updateContent('advocacy', 'solutions', newSolutions);
                              }}
                              style={{ ...styles.input, flex: 1, padding: '4px 8px', fontSize: '14px' }}
                            />
                            <button
                              onClick={() => {
                                const newSolutions = advocacy.solutions.filter((_, i) => i !== index);
                                updateContent('advocacy', 'solutions', newSolutions);
                              }}
                              style={{ ...styles.buttonSmall, ...styles.buttonRed, padding: '2px' }}
                            >
                              <X size={12} />
                            </button>
                          </>
                        ) : solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>My Actions</h3>
              <p style={{ color: '#6b7280', fontSize: isMobile ? '14px' : '16px' }}>
                {renderEditableInput(advocacy.myActions, (value) => updateContent('advocacy', 'myActions', value), 'text', true)}
              </p>
            </div>
          </div>
        );

      default:
        // Handle parent menu sections with overview pages
        if (activeSection === 'education') {
          return (
            <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>🎓 My Education Journey</h2>
                {editMode && (
                  <button 
                    onClick={addEducationLevel} 
                    style={styles.addButton}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.addButtonHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.addButton)}
                  >
                    <Plus size={16} />
                    Add Education Level
                  </button>
                )}
              </div>
              
              <div style={{ ...styles.grid, ...styles.gridMd2 }}>
                {Object.keys(content.education).map((key) => {
                  const edu = content.education[key];
                  return (
                    <div 
                      key={key} 
                      style={{ 
                        ...styles.card, 
                        cursor: 'pointer', 
                        position: 'relative',
                        border: '2px solid transparent',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }} 
                      onClick={() => setActiveSection(key)}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.12)';
                        e.target.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.06)';
                        e.target.style.borderColor = 'transparent';
                      }}
                    >
                      {editMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeEducationLevel(key);
                          }}
                          style={styles.deleteButton}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteButtonHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteButton)}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                      <h3 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '600', marginBottom: '12px', color: '#667eea' }}>{edu.title}</h3>
                      <p style={{ color: '#6b7280', fontSize: isMobile ? '14px' : '16px', marginBottom: '6px', fontWeight: '500' }}>{edu.school}</p>
                      <p style={{ color: '#9ca3af', fontSize: '14px' }}>{edu.years}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
        
        if (activeSection === 'family') {
          return (
            <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>👨‍👩‍👧‍👦 My Beautiful Family</h2>
                {editMode && (
                  <button 
                    onClick={addFamilyMember} 
                    style={styles.addButton}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.addButtonHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.addButton)}
                  >
                    <Plus size={16} />
                    Add Family Member
                  </button>
                )}
              </div>
              
              <div style={{ ...styles.grid, ...styles.gridLg3 }}>
                {Object.keys(content.family).map((key) => {
                  const familyGroup = content.family[key];
                  const firstMember = familyGroup.list[0] || { name: 'No members', image: null };
                  return (
                    <div 
                      key={key} 
                      style={{ 
                        ...styles.card, 
                        ...styles.overviewCard, 
                        position: 'relative', 
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: '2px solid transparent'
                      }} 
                      onClick={() => setActiveSection(key)}
                      onMouseEnter={(e) => {
                        const card = e.currentTarget;
                        card.style.transform = 'translateY(-6px)';
                        card.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.15)';
                        card.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        const card = e.currentTarget;
                        card.style.transform = 'translateY(0)';
                        card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.06)';
                        card.style.borderColor = 'transparent';
                      }}
                    >
                      <div className="card-glow" style={styles.cardGlow}></div>
                      
                      {/* Click indicator */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: '600',
                        opacity: 0.8
                      }}>
                        Click to view
                      </div>
                      
                      {editMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFamilyMember(key);
                          }}
                          style={styles.deleteButton}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteButtonHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteButton)}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                      <div style={{ marginBottom: '20px', marginTop: '12px' }}>
                        {firstMember.image ? (
                          <img src={firstMember.image} alt={firstMember.name} style={{ ...styles.avatarSmall, margin: '0 auto', width: isMobile ? '64px' : '80px', height: isMobile ? '64px' : '80px' }} />
                        ) : (
                          <div style={{ ...styles.avatarPlaceholder, margin: '0 auto', width: isMobile ? '64px' : '80px', height: isMobile ? '64px' : '80px', fontSize: isMobile ? '24px' : '32px' }}>
                            {firstMember.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>{familyGroup.title}</h3>
                      <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '8px' }}>
                        {familyGroup.list.length} {familyGroup.list.length === 1 ? 'member' : 'members'}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', marginBottom: '16px' }}>
                        {firstMember.description && firstMember.description.substring(0, 80)}...
                      </p>
                      
                      {/* Click hint at bottom */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: '#667eea',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginTop: 'auto',
                        paddingTop: '12px',
                        borderTop: '1px solid #f1f5f9'
                      }}>
                        <span>👆 Click to see all members</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
        
        if (activeSection === 'friends') {
          return (
            <div style={{ ...styles.grid, gap: isMobile ? '16px' : '24px' }}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>🌟 My Amazing Friends</h2>
                {editMode && (
                  <button 
                    onClick={addFriendsCategory} 
                    style={styles.addButton}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.addButtonHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.addButton)}
                  >
                    <Plus size={16} />
                    Add Friends Group
                  </button>
                )}
              </div>
              
              <div style={{ ...styles.grid, ...styles.gridMd2 }}>
                {Object.keys(content.friends).map((key) => {
                  const group = content.friends[key];
                  return (
                    <div 
                      key={key} 
                      style={{ 
                        ...styles.card, 
                        cursor: 'pointer', 
                        position: 'relative',
                        border: '2px solid transparent',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }} 
                      onClick={() => setActiveSection(key)}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.12)';
                        e.target.style.borderColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.06)';
                        e.target.style.borderColor = 'transparent';
                      }}
                    >
                      {editMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFriendsCategory(key);
                          }}
                          style={styles.deleteButton}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.deleteButtonHover)}
                          onMouseLeave={(e) => Object.assign(e.target.style, styles.deleteButton)}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                      <h3 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '600', marginBottom: '12px', color: '#667eea' }}>{group.title}</h3>
                      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>{group.description}</p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {group.list.slice(0, 5).map((friend, index) => (
                          <div key={index} style={{ ...styles.avatarPlaceholder, width: isMobile ? '32px' : '36px', height: isMobile ? '32px' : '36px', fontSize: isMobile ? '12px' : '14px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}>
                            {friend.name.charAt(0)}
                          </div>
                        ))}
                        {group.list.length > 5 && (
                          <span style={{ color: '#667eea', fontSize: '14px', fontWeight: '500', marginLeft: '8px' }}>+{group.list.length - 5} more friends</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
        
        return <div style={{ padding: isMobile ? '20px' : '40px', textAlign: 'center', color: '#6b7280' }}>Please select a section from the menu</div>;
    }
  };

  const handleMenuClick = (itemId) => {
    setActiveSection(itemId);
    setMobileMenuOpen(false);
  };

  // Check if multimedia has content
  const hasMultimediaContent = () => {
    return content.multimedia.audio.file || content.multimedia.video.file;
  };

  // Login Modal
  if (showLogin) {
    return (
      <div style={styles.loginModal}>
        <div style={styles.loginCard}>
          <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.flexRow}>
              <button type="submit" style={styles.buttonPrimary}>Login</button>
              <button type="button" onClick={() => setShowLogin(false)} style={styles.buttonSecondary}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerOverlay}></div>
        <div style={styles.headerContent}>
          <div style={styles.headerTop}>
            <div style={styles.logoSection}>
              {/* Logo Section */}
              <div style={styles.relative}>
                {content.logo ? (
                  <img 
                    src={content.logo} 
                    alt="Logo" 
                    style={styles.logo}
                    onClick={editMode ? () => handleImageUpload('logo', 'logo') : undefined}
                  />
                ) : (
                  editMode && (
                    <div 
                      style={styles.logoPlaceholder}
                      onClick={() => handleImageUpload('logo', 'logo')}
                      onMouseEnter={(e) => Object.assign(e.target.style, styles.logoPlaceholderHover)}
                      onMouseLeave={(e) => Object.assign(e.target.style, styles.logoPlaceholder)}
                    >
                      <Upload size={isMobile ? 16 : 20} color="rgba(255, 255, 255, 0.7)" />
                    </div>
                  )
                )}
                {editMode && content.logo && (
                  <button
                    onClick={() => handleImageUpload('logo', 'logo')}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#667eea',
                      padding: '4px',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Edit size={12} />
                  </button>
                )}
              </div>
              
              <h1 style={styles.title}>✨ Personal Portfolio ✨</h1>
              
              {/* Cloud Status Indicator */}
              {isAdmin && !isMobile && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: cloudStatus === 'online' ? '#10b981' : cloudStatus === 'offline' ? '#ef4444' : '#f59e0b'
                  }}></div>
                  {cloudStatus === 'online' && 'GitHub Connected'}
                  {cloudStatus === 'offline' && 'GitHub Offline'}
                  {cloudStatus === 'checking' && 'Connecting GitHub...'}
                </div>
              )}
            </div>
            
            <div style={styles.adminControls}>
              {isAdmin && (
                <>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    style={styles.button}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.button)}
                  >
                    {editMode ? <X size={16} /> : <Edit size={16} />}
                    <span>{editMode ? 'Cancel' : 'Edit'}</span>
                  </button>
                  
                  {editMode && (
                    <>
                      <button
                        onClick={saveContent}
                        style={{ ...styles.button, ...styles.buttonGreen }}
                        onMouseEnter={(e) => Object.assign(e.target.style, { ...styles.button, ...styles.buttonGreen, ...styles.buttonHover })}
                        onMouseLeave={(e) => Object.assign(e.target.style, { ...styles.button, ...styles.buttonGreen })}
                      >
                        <Save size={16} />
                        <span>{isMobile ? '' : 'Save'}</span>
                      </button>
                      
                      {!isMobile && (
                        <>
                          <button onClick={addEducationLevel} style={styles.button}>
                            <Plus size={16} />
                            <span>Add Education</span>
                          </button>
                          
                          <button onClick={addFamilyMember} style={styles.button}>
                            <Plus size={16} />
                            <span>Add Family</span>
                          </button>
                          
                          <button onClick={addFriendsCategory} style={styles.button}>
                            <Plus size={16} />
                            <span>Add Friends Group</span>
                          </button>
                        </>
                      )}
                    </>
                  )}
                  
                  {!isMobile && (
                    <>
                      <button
                        onClick={exportData}
                        style={styles.button}
                      >
                        <Download size={16} />
                        <span>Export</span>
                      </button>
                      
                      <label style={{ ...styles.button, cursor: 'pointer' }}>
                        <Upload size={16} />
                        <span>Import</span>
                        <input type="file" accept=".json" onChange={importData} style={styles.hiddenInput} />
                      </label>
                    </>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    style={{ ...styles.button, ...styles.buttonRed }}
                  >
                    <LogOut size={16} />
                    <span>{isMobile ? '' : 'Logout'}</span>
                  </button>
                </>
              )}
              
              {!isAdmin && (
                <button
                  onClick={() => setShowLogin(true)}
                  style={styles.button}
                >
                  <Lock size={16} />
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation - Desktop and Mobile */}
          {!isMobile ? (
            // Desktop Navigation
            <nav style={styles.nav}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeSection));
                return (
                  <div 
                    key={item.id} 
                    style={styles.navItem}
                    onMouseEnter={(e) => {
                      if (item.subItems) {
                        const dropdown = e.currentTarget.querySelector('[data-dropdown]');
                        if (dropdown) {
                          Object.assign(dropdown.style, styles.dropdownVisible);
                        }
                      }
                      const button = e.currentTarget.querySelector('button');
                      if (button && !isActive) {
                        Object.assign(button.style, styles.navButtonHover);
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (item.subItems) {
                        const dropdown = e.currentTarget.querySelector('[data-dropdown]');
                        if (dropdown) {
                          dropdown.style.opacity = '0';
                          dropdown.style.visibility = 'hidden';
                        }
                      }
                      const button = e.currentTarget.querySelector('button');
                      if (button && !isActive) {
                        Object.assign(button.style, styles.navButton);
                      }
                    }}
                  >
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      style={{
                        ...styles.navButton,
                        ...(isActive ? styles.navButtonActive : {})
                      }}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                    
                    {item.subItems && item.subItems.length > 0 && (
                      <div data-dropdown style={styles.dropdown}>
                        {item.subItems.map((subItem) => (
                          <div key={subItem.id} style={styles.dropdownItem}>
                            <button
                              onClick={() => handleMenuClick(subItem.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: activeSection === subItem.id ? '#667eea' : '#374151',
                                cursor: 'pointer',
                                fontSize: '14px',
                                flex: 1,
                                textAlign: 'left',
                                padding: 0,
                                fontWeight: activeSection === subItem.id ? '600' : '400'
                              }}
                              onMouseEnter={(e) => Object.assign(e.target.style, styles.dropdownItemHover)}
                              onMouseLeave={(e) => Object.assign(e.target.style, { background: 'none', color: activeSection === subItem.id ? '#667eea' : '#374151' })}
                            >
                              {subItem.label}
                            </button>
                            {editMode && item.id === 'education' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeEducationLevel(subItem.id);
                                }}
                                style={{ ...styles.buttonSmall, ...styles.buttonRed, padding: '2px', marginLeft: '8px' }}
                              >
                                <X size={10} />
                              </button>
                            )}
                            {editMode && item.id === 'family' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFamilyMember(subItem.id);
                                }}
                                style={{ ...styles.buttonSmall, ...styles.buttonRed, padding: '2px', marginLeft: '8px' }}
                              >
                                <X size={10} />
                              </button>
                            )}
                            {editMode && item.id === 'friends' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFriendsCategory(subItem.id);
                                }}
                                style={{ ...styles.buttonSmall, ...styles.buttonRed, padding: '2px', marginLeft: '8px' }}
                              >
                                <X size={10} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          ) : (
            // Mobile Navigation
            <div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={styles.mobileMenuButton}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                <span>Menu</span>
              </button>
              
              {mobileMenuOpen && (
                <div style={styles.mobileMenuOpen}>
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeSection));
                    return (
                      <div key={item.id}>
                        <button
                          onClick={() => handleMenuClick(item.id)}
                          style={{
                            ...styles.mobileMenuItem,
                            backgroundColor: isActive ? '#f0f9ff' : 'transparent',
                            color: isActive ? '#667eea' : '#374151',
                            fontWeight: isActive ? '600' : '500'
                          }}
                        >
                          <Icon size={16} style={{ marginRight: '12px', display: 'inline' }} />
                          {item.label}
                        </button>
                        
                        {item.subItems && (
                          <div>
                            {item.subItems.map((subItem) => (
                              <button
                                key={subItem.id}
                                onClick={() => handleMenuClick(subItem.id)}
                                style={{
                                  ...styles.mobileMenuItem,
                                  ...styles.mobileSubItem,
                                  backgroundColor: activeSection === subItem.id ? '#f0f9ff' : '#f8fafc',
                                  color: activeSection === subItem.id ? '#667eea' : '#374151',
                                  fontWeight: activeSection === subItem.id ? '600' : '400'
                                }}
                              >
                                {subItem.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {renderContent()}
      </main>

      {/* Multimedia Section - Only show if has content or admin is logged in */}
      {(hasMultimediaContent() || isAdmin) && (
        <section style={styles.multimedia}>
          <div style={styles.multimediaContent}>
            <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: isMobile ? '16px' : '24px', textAlign: 'center' }}>Multimedia</h2>
            
            <div style={styles.multimediaGrid}>
              {/* Audio Section */}
              {(content.multimedia.audio.file || isAdmin) && (
                <div style={styles.multimediaCard}>
                  <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Music size={20} />
                    Audio Clip
                  </h3>
                  <div style={styles.multimediaInner}>
                    <p style={{ color: '#6b7280', marginBottom: '12px', fontSize: isMobile ? '14px' : '16px' }}>
                      {renderEditableInput(content.multimedia.audio.title, (value) => updateContent('multimedia', 'audio.title', value))}
                    </p>
                    {content.multimedia.audio.file ? (
                      <audio controls style={{ width: '100%', marginBottom: '16px' }}>
                        <source src={content.multimedia.audio.file} />
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      <div style={styles.mediaPlaceholder}>
                        <Music size={32} color="#6b7280" />
                      </div>
                    )}
                    {editMode && (
                      <button
                        onClick={() => handleFileUpload('audio', 'file')}
                        style={{ ...styles.button, backgroundColor: '#3b82f6', margin: '0 auto', display: 'flex' }}
                      >
                        <Upload size={16} />
                        Upload Audio
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Video Section */}
              {(content.multimedia.video.file || isAdmin) && (
                <div style={styles.multimediaCard}>
                  <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Play size={20} />
                    Video Clip
                  </h3>
                  <div style={styles.multimediaInner}>
                    <p style={{ color: '#6b7280', marginBottom: '12px', fontSize: isMobile ? '14px' : '16px' }}>
                      {renderEditableInput(content.multimedia.video.title, (value) => updateContent('multimedia', 'video.title', value))}
                    </p>
                    {content.multimedia.video.file ? (
                      <video controls style={{ width: '100%', marginBottom: '16px' }}>
                        <source src={content.multimedia.video.file} />
                        Your browser does not support the video element.
                      </video>
                    ) : (
                      <div style={styles.mediaPlaceholder}>
                        <Play size={32} color="#6b7280" />
                      </div>
                    )}
                    {editMode && (
                      <button
                        onClick={() => handleFileUpload('video', 'file')}
                        style={{ ...styles.button, backgroundColor: '#3b82f6', margin: '0 auto', display: 'flex' }}
                      >
                        <Upload size={16} />
                        Upload Video
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerOverlay}></div>
        <div style={styles.footerContent}>
          <p style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '500', marginBottom: '8px' }}>&copy; 2024 My Personal Website. All rights reserved.</p>
          <p style={{ color: '#cbd5e1', fontSize: isMobile ? '12px' : '14px' }}>Built with ❤️ and React | Admin: veronica/veronica</p>
          {cloudStatus === 'offline' && (
            <p style={{ color: '#fbbf24', fontSize: '12px', marginTop: '8px' }}>
              ⚠️ GitHub API not configured. Changes only visible locally. 
              <br />Create a GitHub Personal Access Token to enable teacher visibility.
            </p>
          )}
          {cloudStatus === 'online' && (
            <p style={{ color: '#10b981', fontSize: '12px', marginTop: '8px' }}>
              ✅ Connected to GitHub - Changes are visible to everyone!
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default PersonalWebsite;