import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Calendar, 
  Clock, 
  Share2, 
  Bell, 
  Image as ImageIcon,
  Facebook,
  Instagram,
  Twitter,
  Plus,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledTime: string;
  image?: string;
  status: 'scheduled' | 'posted';
}

export function SocialScheduler() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [newPost, setNewPost] = useState({
    content: '',
    platforms: [] as string[],
    scheduledTime: '',
    image: null as File | null
  });

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'text-gray-800' },
    { id: 'whatsapp', name: 'WhatsApp Business', icon: Share2, color: 'text-green-600' }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setNewPost(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost(prev => ({ ...prev, image: file }));
    }
  };

  const schedulePost = () => {
    if (!newPost.content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter post content",
        variant: "destructive"
      });
      return;
    }

    if (newPost.platforms.length === 0) {
      toast({
        title: "Platform Required",
        description: "Please select at least one platform",
        variant: "destructive"
      });
      return;
    }

    if (!newPost.scheduledTime) {
      toast({
        title: "Time Required",
        description: "Please select when to post",
        variant: "destructive"
      });
      return;
    }

    const scheduledPost: ScheduledPost = {
      id: Date.now().toString(),
      content: newPost.content,
      platforms: newPost.platforms,
      scheduledTime: newPost.scheduledTime,
      image: newPost.image ? URL.createObjectURL(newPost.image) : undefined,
      status: 'scheduled'
    };

    setScheduledPosts(prev => [...prev, scheduledPost]);
    
    // Reset form
    setNewPost({
      content: '',
      platforms: [],
      scheduledTime: '',
      image: null
    });

    // Clear file input
    const fileInput = document.getElementById('post-image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    toast({
      title: "Post Scheduled!",
      description: "Your post has been added to the schedule"
    });

    // Schedule browser notification (if permission granted)
    if ('Notification' in window && Notification.permission === 'granted') {
      const scheduledDate = new Date(newPost.scheduledTime);
      const now = new Date();
      const timeUntilPost = scheduledDate.getTime() - now.getTime();
      
      if (timeUntilPost > 0) {
        setTimeout(() => {
          new Notification('Time to Post!', {
            body: `Your scheduled post is ready: "${newPost.content.substring(0, 50)}..."`,
            icon: '/favicon.ico'
          });
        }, timeUntilPost);
      }
    }
  };

  const deletePost = (id: string) => {
    setScheduledPosts(prev => prev.filter(post => post.id !== id));
    toast({
      title: "Post Deleted",
      description: "Scheduled post removed"
    });
  };

  const shareNow = async (post: ScheduledPost) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Social Media Post',
          text: post.content
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(post.content);
      toast({
        title: "Copied!",
        description: "Post content copied to clipboard"
      });
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          toast({
            title: "Notifications Enabled",
            description: "You'll receive reminders for scheduled posts"
          });
        }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('tools.social.title')}</h1>
        <p className="text-muted-foreground">{t('tools.social.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Create Post */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content */}
            <div>
              <Label htmlFor="post-content">Post Content *</Label>
              <Textarea
                id="post-content"
                placeholder="What do you want to share with your customers?"
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                className="mt-1"
                rows={4}
              />
              <div className="text-xs text-muted-foreground mt-1">
                {newPost.content.length}/280 characters
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="post-image">Add Image (Optional)</Label>
              <Input
                id="post-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1"
              />
              {newPost.image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(newPost.image)}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            {/* Platforms */}
            <div>
              <Label>Select Platforms *</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={newPost.platforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                    />
                    <Label
                      htmlFor={platform.id}
                      className={`flex items-center gap-2 cursor-pointer ${platform.color}`}
                    >
                      <platform.icon className="h-4 w-4" />
                      {platform.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Time */}
            <div>
              <Label htmlFor="schedule-time">Schedule for *</Label>
              <Input
                id="schedule-time"
                type="datetime-local"
                value={newPost.scheduledTime}
                onChange={(e) => setNewPost(prev => ({ ...prev, scheduledTime: e.target.value }))}
                className="mt-1"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            {/* Notification Permission */}
            {'Notification' in window && Notification.permission === 'default' && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Enable Notifications</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Get reminded when it's time to post your scheduled content.
                </p>
                <Button size="sm" variant="outline" onClick={requestNotificationPermission}>
                  Enable Notifications
                </Button>
              </div>
            )}

            <Button 
              onClick={schedulePost}
              className="w-full"
              size="lg"
              variant="hero"
            >
              Schedule Post
            </Button>
          </CardContent>
        </Card>

        {/* Scheduled Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scheduled Posts ({scheduledPosts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scheduledPosts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No posts scheduled yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <Card key={post.id} className="p-4">
                    <div className="space-y-3">
                      <p className="text-sm">{post.content}</p>
                      
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post image"
                          className="h-16 w-16 object-cover rounded"
                        />
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(post.scheduledTime).toLocaleString()}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {post.platforms.map((platformId) => {
                          const platform = platforms.find(p => p.id === platformId);
                          return platform ? (
                            <div
                              key={platformId}
                              className={`flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs ${platform.color}`}
                            >
                              <platform.icon className="h-3 w-3" />
                              {platform.name}
                            </div>
                          ) : null;
                        })}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => shareNow(post)}
                          className="gap-1"
                        >
                          <Share2 className="h-3 w-3" />
                          Share Now
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deletePost(post.id)}
                          className="gap-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">💡 Social Media Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Best Posting Times</h4>
              <ul className="space-y-1">
                <li>• Facebook: 9 AM - 10 AM</li>
                <li>• Instagram: 11 AM - 1 PM</li>
                <li>• WhatsApp: 6 PM - 9 PM</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Content Ideas</h4>
              <ul className="space-y-1">
                <li>• Behind-the-scenes content</li>
                <li>• Customer testimonials</li>
                <li>• Product demonstrations</li>
                <li>• Special offers and promotions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}