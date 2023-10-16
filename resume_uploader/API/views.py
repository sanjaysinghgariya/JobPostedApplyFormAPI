from django.shortcuts import render
from API.models import Profile, Job, Profile1
from API.serializers import ProfileSerializer, JobSerializer, Profile1Serializer
from rest_framework.views import APIView
from rest_framework import  status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import RetrieveAPIView






# Create your views here.
class ProfileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, format=None):
        serializer = ProfileSerializer(data=request.data)
        print('serializer.is_valid()', serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response({
                'msg':"Resume Uploaded Sucessfully",
                "status" : "sucesss",
                'candidate':serializer.data
            }, status=status.HTTP_201_CREATED)
        

        print(serializer.errors)
        return Response({
                'error':serializer.errors
            })
    

    def get(self, request, format=None):
        candidates = Profile.objects.all()
        serializer = ProfileSerializer(candidates, many=True )
        return Response({'status':'success', 'candidates':serializer.data},status=status.HTTP_200_OK)
    


class JobView(APIView):
    def get(self, request, format=None):
            job_post = Job.objects.all()
            serializer = JobSerializer(job_post, many=True )
            print("Hello")
            return Response({'status':'success', 'job_post':serializer.data},status=status.HTTP_200_OK)
    
class JobDetailView(RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer



class Profile1View(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, format=None):
        serializer = Profile1Serializer(data=request.data)        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'msg':"Resume Uploaded Sucessfully",
                "status" : "sucesss",
                'candidate':serializer.data
            }, status=status.HTTP_201_CREATED)
        

        print(serializer.errors)
        return Response({
                'error':serializer.errors
            })
    

    def get(self, request, format=None):
        candidates = Profile1.objects.all()
        serializer = Profile1Serializer(candidates, many=True )
        return Response({'status':'success', 'candidates':serializer.data},status=status.HTTP_200_OK)
        