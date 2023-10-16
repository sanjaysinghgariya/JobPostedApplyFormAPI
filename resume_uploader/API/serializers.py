from rest_framework import serializers
from API.models import Profile, Job, Profile1


class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = ['id', 'name', 'email', 'date_of_birth',
                'state', 'gender', 'location', 'profile_image', 'resume_pdf', 'status']
        

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


class Profile1Serializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile1
        fields = ['id', 'name1', 'email1','job', 'date_of_birth1',
                'state1', 'gender1', 'location1', 'profile_image1', 'resume_pdf1', 'status1']