from django.db import models

STATE_CHOICES = (('Andhra Pradesh', 'Andhra Pradesh'),
                  ('Arunachal Pradesh', 'Arunachal Pradesh'), 
                  ('Assam', 'Assam'), ('Bihar', 'Bihar'),
                    ('Chhattisgarh', 'Chhattisgarh'),
                      ('Goa', 'Goa'), ('Gujarat', 'Gujarat'),
                        ('Haryana', 'Haryana'), ('Himachal Pradesh', 'Himachal Pradesh'), 
                        ('Jharkhand', 'Jharkhand'), ('Karnataka', 'Karnataka'), 
                        ('Kerala', 'Kerala'), ('Madhya Pradesh', 'Madhya Pradesh'), 
                        ('Maharashtra', 'Maharashtra'), 
                        ('Manipur', 'Manipur'), 
                        ('Meghalaya', 'Meghalaya'), ('Mizoram', 'Mizoram'), 
                        ('Nagaland', 'Nagaland'), ('Odisha', 'Odisha'),
                          ('Punjab', 'Punjab'), ('Rajasthan', 'Rajasthan'), 
                          ('Sikkim', 'Sikkim'), ('Tamil Nadu', 'Tamil Nadu'), ('Telangana', 'Telangana'), ('Tripura', 'Tripura'), ('Uttar Pradesh', 'Uttar Pradesh'), ('Uttarakhand', 'Uttarakhand'),
                          ('West Bengal', 'West Bengal'))

same_status_pairs = [
    ('Received', 'Received'),
    ('Under Review', 'Under Review'),
    ('Shortlisted', 'Shortlisted'),
    ('Interview Scheduled', 'Interview Scheduled'),
    ('Interviewed', 'Interviewed'),
    ('Reference Check', 'Reference Check'),
    ('Offer Extended', 'Offer Extended'),
    ('Offer Accepted', 'Offer Accepted'),
    ('Offer Declined', 'Offer Declined'),
    ('Not Selected', 'Not Selected'),
    ('On Hold', 'On Hold'),
    ('Withdrawn', 'Withdrawn')
]




# Create your models here.
class Profile(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    date_of_birth = models.DateField(auto_now=False, auto_now_add=False)
    state = models.CharField(choices=STATE_CHOICES, max_length=255)
    gender = models.CharField(max_length=10)
    location = models.CharField(max_length=255)
    profile_image = models.ImageField(upload_to='profile_images', blank=False)
    resume_pdf = models.FileField(upload_to='resume_file', blank=False)
    status = models.CharField(max_length=255,choices=same_status_pairs, default='Received', null=True)
    
    def ___str__(self):
        return self.name +"=>" +self.email









EXPERIENCE_CHOICES = [
        ('Fresher', 'Fresher'),
        ('0-1', '0-1'),
        ('1-2', '1-2'),
        ('2-3', '2-3'),
        ('3-4', '3-4'),
        ('5+', '5+'),
    ]

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    salary = models.CharField(max_length=255)
    is_remote = models.BooleanField(default=False)
    experience = models.CharField(max_length=100, choices=EXPERIENCE_CHOICES )
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

class Profile1(models.Model):
    name1 = models.CharField(max_length=255)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    email1 = models.EmailField(max_length=255)
    date_of_birth1 = models.DateField(auto_now=False, auto_now_add=False)
    state1 = models.CharField(choices=STATE_CHOICES, max_length=255)
    gender1 = models.CharField(max_length=10)
    location1 = models.CharField(max_length=255)
    profile_image1 = models.ImageField(upload_to='profile_images', blank=False)
    resume_pdf1 = models.FileField(upload_to='resume_file', blank=False)
    status1 = models.CharField(max_length=255,choices=same_status_pairs, default='Received', null=True)
    
    def ___str__(self):
        return self.name1 +"=>" +self.email1
    
    